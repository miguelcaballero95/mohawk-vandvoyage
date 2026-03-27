import { GoogleGenAI } from "@google/genai";
import { getStore } from "@netlify/blobs";
import { getTravelTypes } from "../../src/data";

const CLIENT_ID = Netlify.env.get("AMADEUS_CLIENT_ID");
const CLIENT_SECRET = Netlify.env.get("AMADEUS_CLIENT_SECRET");
const GEMINI_API_KEY = Netlify.env.get("GEMINI_API_KEY");
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Refresh and retrieve Amadeus Access Token
 * @returns token
 */
async function getAccessToken() {

  const store = getStore('amadeus');

  // Try to load cached token
  const cached = await store.get("token", { type: "json" }).catch(() => null);

  // Check if token exists and has > 60s remaining (buffer)
  if (cached && Date.now() < cached.expiresAt - 60_000) {
    console.log("Returning cached token");
    return cached.accessToken;
  }

  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  });

  if (!response.ok) {
    throw new Error(`Fallo en autenticación Amadeus: ${response.statusText}`);
  }

  const data = await response.json();

  console.log("Generating new access token");

  // Save token + calculated expiry time
  await store.set("token", JSON.stringify({
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }));

  return data.access_token;
}

async function geminiProcess(activities) {

  const userFilter = "";

  const payload = activities.map(act => ({
    id: act.id,
    name: act.name,
    description: act.description
  }));

  const instructions = `
    You are a strict data categorizer and filter. 
    Your ONLY output must be a valid JSON array. No markdown, no markdown code blocks (\`\`\`json), and no extra text.
    You will receive a list of activities, a list of valid categories, and a user search criterion.    
    Rules:
    1. Evaluate each activity against the user search criterion. If the activity DOES NOT match the user's request, ignore it completely and omit it from the output array.
    2. If the activity matches the criterion, assign 1 or more category IDs that best fit its description. You must ONLY use the provided category IDs.
    3. You must return strictly an array of objects matching this exact structure:
    [
      {
        "id": "ACTIVITY_ID",
        "categories": ["category-id-1", "category-id-2"]
      }
    ]
    Do not alter the activity IDs and do not add any extra keys to the objects.`;

  const prompt = `
    User search criterion: "${userFilter || 'No filter, include all'}"    
    Valid categories:
    ${JSON.stringify(getTravelTypes())}
    Activities to process:
    ${JSON.stringify(payload)}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: instructions,
      responseMimeType: "application/json",
      temperature: 0.1
    }
  });

  const filteredActivities = JSON.parse(response.text);
  const result = filteredActivities.map(act => {
    const original = activities.find(a => a.id === act.id);
    return {
      ...original,
      categories: act.categories
    }
  })

  return result;
}

/**
 * Main method, gets activities based on location
 * Send data to Gemini to sort them by category
 * @returns Data sorted
 */
export default async (req, context) => {

  if (req.method !== 'GET') {
    return new Response("Method not allowed", 405);
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new Response("Amadeus credentials are not set", 405);
  }

  const token = await getAccessToken();

  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  const response = await fetch(
    `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lon}&radius=5`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const { data } = await response.json();
  const result = await geminiProcess(data);

  return new Response(JSON.stringify(result));
};
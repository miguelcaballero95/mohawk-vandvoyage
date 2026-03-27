import { getStore } from "@netlify/blobs";

const CLIENT_ID = Netlify.env.get("AMADEUS_CLIENT_ID");
const CLIENT_SECRET = Netlify.env.get("AMADEUS_CLIENT_SECRET");

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
    `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lon}&radius=20`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const { data } = await response.json();

  return new Response(JSON.stringify(data));
};
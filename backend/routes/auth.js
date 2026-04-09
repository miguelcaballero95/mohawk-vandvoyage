const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const path = require("path");
const User = require("../models/User");

// Initialize Firebase Admin SDK once
if (!admin.apps.length) {
  let credential;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Production: full service account JSON stored as an env variable
    credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    // Local dev: path to the JSON file
    credential = admin.credential.cert(require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)));
  } else {
    credential = admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    });
  }
  admin.initializeApp({ credential });
}

// POST /api/auth/firebase
// Verifies a Firebase ID token and creates or returns the matching user
router.post("/firebase", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "idToken is required" });
  }

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const { uid, email, name, firebase } = decoded;

  // Map Firebase sign_in_provider to our auth_provider values
  // Firebase uses "google.com", "facebook.com", "apple.com" as provider IDs
  const providerMap = {
    "google.com": "google",
    "facebook.com": "facebook",
    "apple.com": "apple",
  };
  const provider = providerMap[firebase?.sign_in_provider] || "local";

  try {
    let user = await User.findOne({ auth_provider_id: uid });

    if (!user) {
      // Check if email already exists (e.g. registered locally before)
      user = await User.findOne({ email });

      if (user) {
        // Link the Google account to the existing user
        user.auth_provider = provider;
        user.auth_provider_id = uid;
        await user.save();
      } else {
        // Create a new user
        user = await User.create({
          display_name: name || email.split("@")[0],
          email,
          auth_provider: provider,
          auth_provider_id: uid,
          consent_flags: { terms_accepted: true },
        });
      }
    }

    res.json({ user });
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Server error during authentication" });
  }
});

// POST /api/auth/register
// Creates a new user with email/password via Firebase and stores in MongoDB
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  try {
    // Create user in Firebase
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: name || email.split("@")[0],
    });

    // Create user in MongoDB
    const user = await User.create({
      display_name: name || email.split("@")[0],
      email,
      auth_provider: "local",
      auth_provider_id: firebaseUser.uid,
      consent_flags: { terms_accepted: true },
    });

    res.status(201).json({ user });
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      return res.status(409).json({ error: "Email already in use" });
    }
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// POST /api/auth/reset-password
// Sends a password reset email via Firebase
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const resetLink = await admin.auth().generatePasswordResetLink(email);
    // In production, you would send this link via an email service.
    // Firebase also sends its own reset email if configured.
    res.json({ message: "Password reset link has been generated", resetLink });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      // Don't reveal whether the email exists
      return res.json({ message: "If that email exists, a reset link has been sent" });
    }
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Server error during password reset" });
  }
});

// PATCH /api/auth/language
// Updates the user's preferred language
router.patch("/language", async (req, res) => {
  const { idToken, language } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "idToken is required" });
  }

  const supported = ["en", "es", "fr"];
  if (!supported.includes(language)) {
    return res.status(400).json({ error: "Supported languages: en, es, fr" });
  }

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { auth_provider_id: decoded.uid },
      { preferred_language: language },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Language update error:", err);
    res.status(500).json({ error: "Server error updating language" });
  }
});

module.exports = router;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import {
  findUserByEmail,
  createUser,
  createGoogleUser,
} from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

// ------------------- Signup -------------------
export const signup = async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingUser = await findUserByEmail(email, "", "");
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    //await createUser(name, email, hashed);
    await createUser(name, email, password);

    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------- Login -------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email, password, "");
    if (!user || !user[0].password)
      return res.status(400).json({ message: "Invalid Credential" });

    // const isMatch = await bcrypt.compare(password, user[0].password_hash);
    // if (!isMatch)
    if (password != user[0].password)
      return res.status(400).json({ message: "Invalid Credential" });
    // console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------- Google Auth -------------------
export const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await findUserByEmail(email, "", "");
    if (!user) {
      await createGoogleUser(sub, name, email, picture);
      user = await findUserByEmail(email, "", "");
    }

    const jwtToken = generateToken(user);
    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid Google token" });
  }
};

// ------------------- Profile -------------------
export const profile = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email),
      password = "",
      googleId = "";
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


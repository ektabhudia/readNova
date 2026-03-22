import db from "../db.js";

export const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

export const createUserManual = async (name, email, password) => {
  const [result] = await db.query("CALL userSignUp_Insert(?, ?, ?)", [
    name,
    email,
    password,
  ]);
  return result.insertId;
};

// Find user by email
export const findUserByEmail = async (email, password, googleId) => {
  const [rows] = await db.query("CALL identifyUser(?, ?, ?)", [
    email,
    password,
    "",
  ]);
  return rows[0];
};

export const resetMailVerification = async (email) => {
  let code = Math.floor(100000 + Math.random() * 900000);
  const [rows] = await db.query("CALL verifyEmailEntry(?,?)", [
    email,
    code
  ]);
  return rows[0];
};
// Create user (manual signup)
export const createUser = async (name, email, passwordHash) => {
  await db.query(
    "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );
};

// Create Google user
export const createGoogleUser = async (googleId, name, email) => {
  await db.query(
    "INSERT INTO users (user_google_id, user_name, user_email) VALUES (?, ?, ?)",
    [googleId, name, email]
  );
};
export default {
  getAllUsers,
  createUserManual,
  findUserByEmail,
  resetMailVerification
};

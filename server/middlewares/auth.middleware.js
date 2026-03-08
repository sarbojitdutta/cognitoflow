import { verifyToken } from "../utils/token.util.js";

const protect = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = await verifyToken(token);
    // ensure id is a plain string (JWT may serialise a Mongo ObjectId as an object)
    if (decoded && decoded.id && typeof decoded.id !== 'string') {
      try {
        decoded.id = decoded.id.toString();
      } catch {
        // nothing
      }
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('auth.middleware verifyToken error:', err.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
}

export default protect

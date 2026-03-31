import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uID: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String },
  xp: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  currentBadge: { type: String, default: null },
  streak: { type: Number, default: 0 },
  lastCompletedDate: { type: Date, default: null },
  tasksDone: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    refresh: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", TokenSchema);

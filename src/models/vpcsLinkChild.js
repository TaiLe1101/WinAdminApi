import mongoose from "mongoose";

const { Schema } = mongoose;

const vpcsLinkChildSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    visitAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    vpcsLinkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vpcsLinks",
    },
  },
  {
    timestamps: true,
  }
);

export const VpcsLinkChild = mongoose.model(
  "vpcsLinkChild",
  vpcsLinkChildSchema
);

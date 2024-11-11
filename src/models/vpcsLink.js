import mongoose from "mongoose";

const { Schema } = mongoose;

const vpcsLinkSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      require: true,
    },
    currentChild: {
      type: Number,
      default: 0,
    },
    timeOut: {
      type: Number,
      default: 300, //3 second
    },
    social: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    visitAmount: {
      type: Number,
      default: 0,
    },
    metaDesc: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    variantUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const VpcsLink = mongoose.model("vpcsLink", vpcsLinkSchema);

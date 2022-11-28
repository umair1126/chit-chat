const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],

  groupName: { type: String, default: null },

  conversationType: { type: String, default: "single" },

  lastMessage: { type: String, default: "" },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;

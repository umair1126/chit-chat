const Conversation = require("../../model/conversation");
const Message = require("../../model/message");
const User = require("../../model/user");

// const Email = require("../../utils/mailer");
// const ResetEmail = require("../../utils/resetMailer");

const {
  compareString,
  generateAccessToken,
  hashString,
  randomToken,
} = require("../../utils/helper");

class Users {
  getUsers = async (req, res) => {
    try {
      const { _id } = req.params;
      const users = await User.find({ _id: { $ne: _id } });
      res?.status(200).json({ users });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  newConversation = async (req, res) => {
    try {
      const { groupName, members } = req.body;
      console.log(groupName, members);
      const data = await Conversation.create({
        groupName: groupName,
        members: members,
        conversationType: "group",
      });
      if (data) {
        res?.status(201).json({ message: "group created successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getConversation = async (req, res) => {
    try {
      let conversations = [];
      // console.log(req.params);

      conversations = await Conversation.find({
        members: { $all: [req.params.senderId, req.params.receiverId] },
      });

      // console.log(conversations, "conversations");
      if (conversations.length > 0) {
        const conversationID = conversations[0]._id;
        const data = await Message.find({
          conversationID: conversationID,
        }).populate("senderId");
        // console.log(conversations, "conversations");
        res?.status(200).json({ data: data });
      } else {
        res?.status(200).json({ data: [] });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getGroupConversation = async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(id);
      const data = await Message.find({ conversationID: id }).populate(
        "senderId"
      );
      res?.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  getConversations = async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(_id);
      const data = await Conversation.find({
        members: { $in: [_id] },
      }).populate("members");
      res?.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  addMessage = async (req, res) => {
    try {
      let { conversationId, senderId, receiverId, text } = req.body;
      if (!conversationId) {
        let newConversation = await Conversation.find({
          members: { $all: [senderId, receiverId] },
        });
        console.log(newConversation);
        if (newConversation.length > 0) {
          conversationId = newConversation[0]._id;
        } else {
          newConversation = await Conversation.create({
            members: [req.body.senderId, req.body.receiverId],
          });
          conversationId = newConversation._id;
          // res?.status(201).json({
          //   // message: "new conversation created",
          //   conversation: newConversation,
          // });
        }
      }
      const conversation = await Conversation.findById({ _id: conversationId });
      console.log(conversation, "conversaton");
      if (conversation) {
        const Data = await Message.create({
          conversationID: conversationId,
          senderId: senderId,
          text: text,
        });
        if (Data) {
          await Conversation.findByIdAndUpdate(
            { _id: conversationId },
            { lastMessage: text },
            { new: true }
          );
          res?.status(201).json({ Data });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };
}

module.exports = new Users();

import { io, getReceiverSocketId } from "../socket/socket.js";
import uploadOnCloudinary from "./../config/cloudinary.js";
import Conversation from "./../models/conversation.model.js";
import Message from "./../models/message.model.js";
 
export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.receiver;
    const { message } = req.body;
 
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
 
    // Don't save empty messages
    if (!message?.trim() && !image) {
      return res.status(400).json({ message: "Message or image is required" });
    }
 
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });
 

    let conversation = await Conversation.findOne({
  participants: { $all: [sender, receiver] },
});

if (!conversation) {
  conversation = await Conversation.create({
    participants: [sender, receiver],
    message: [newMessage._id],
  });
} else {
  conversation.message.push(newMessage._id);
  await conversation.save();
}
 
    // Realtime: send ONLY the new message, ONLY to the receiver
    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
 
    return res.status(201).json(newMessage);
  } catch (err) {
    return res.status(500).json({ message: `send message error ${err}` });
  }
};
 
export const getMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.receiver;
 
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("message");
 
    // Always respond with the message list (empty if no conversation yet)
    return res.status(200).json(conversation?.message || []);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get message error ${error}` });
  }
};

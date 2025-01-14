import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    isRead: {
        type: Boolean,
        required: true,
    },
},{ 
    timestamps: { createdAt: 'sentAt' }
  });

const Message = mongoose.model("Message", messageSchema);

export default Message;
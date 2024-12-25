import Message from "../models/Message.js";
import Room from "../models/Room.js";

export const getMessagesByRoomId = async(req,res)=> {
    try {
        const { roomId } = req.params;
        const messages = await Message.find(roomId);

        if (!room) {
            return res.status(400).json({error: "messages not found"});
        }

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({error: "internal server error"});
    }
}

export const createMessage = async (req,res)=> {
    try {
        const { roomId } = req.params;
        const { content, senderId } = req.body;

        if (!content || !senderId) {
            return res.status(400).json({error: "invalid credentials"});
        }

        const sender = await User.findById( senderId );

        if(!sender) {
            return res.status(404).json({error: "sender not found"});
        }

        const message = await Message.create({
            roomId, content, senderId
        });

        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            { $push: { messages: message._id } },
            { new: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ error: "Room not found" });
        }

        res.status(201).json({
            message: "Message was created successfully",
            data: message,
        });

    } catch (error) {
        res.status(500).json({error: "internal server error"});
    }
}
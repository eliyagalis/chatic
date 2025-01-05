import Room from "../models/Room.js"
import User from "../models/User.js";

export const getRooms = async (req,res)=> {
    try {
        const rooms = await Room.find({});

        if (!rooms) {
            return res.status(404).json({error: "rooms not found"});
        }

        res.status(200).json(rooms);

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}

export const getRoomByParticipants = async (req, res) => {
    try {
        const participants = req.body; 

        if (!participants || participants.length !== 2) {
            return res.status(400).json({ error: "Exactly two participants are required" });
        }

        const sortedParticipants = [...participants].sort();

        let room = await Room.findOne({ participants: sortedParticipants });

        if (!room) {
            room = await Room.create({ participants: sortedParticipants });
        }

        const users = await User.find({ _id: { $in: participants } }).select("username _id");

        if (users.length !== 2) {
            return res.status(404).json({ error: "One or both users not found" });
        }

        const otherUsers = users.filter(user => !sortedParticipants.includes(user._id.toString()));

        res.status(200).json({
            room,
            otherUser: otherUsers[0],
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createRoom = async (participants)=> {
    const room = await Room.create({ participants });
    return room;
}

export const getRoomById = async (req,res)=> {
    try {
        const {roomId} = req.params;

        const room = await Room.findById(roomId);

        if(!room) {
            return res.status(404).json({error: "room not found"});
        }

        res.status(200).json(room);

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}
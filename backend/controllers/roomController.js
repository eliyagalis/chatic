import Room from "../models/Room.js"
import User from "../models/User.js";

export const getRooms = async (req,res)=> {
    try {
        const rooms = await Room.find({});

        if (!rooms) {
            return res.status(404).json({error: "rooms not found"}).populate("participants", "username _id");
        }

        res.status(200).json(rooms);

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}

const validateParticipants = async (participants) => {
    if (!participants || participants.length !== 2) {
        throw new Error("Exactly two participants are required.");
    }

    const sortedParticipants = [...participants].sort();
    const users = await User.find({ _id: { $in: sortedParticipants } }).select("username _id");

    if (users.length !== 2) {
        throw new Error("One or both users not found.");
    }

    return { sortedParticipants, usernames: users.map((user) => user.username), users };
};

const findOrCreateRoom = async (sortedParticipants, usernames) => {
    let room = await Room.findOne({ participants: sortedParticipants });

    if (!room) {
        room = await Room.create({
            participants: sortedParticipants,
            participantsUsernames: usernames,
        });
    }

    return room;
};

export const getRoomByParticipants = async (req, res) => {
    try {
        const participants = req.body;

        const { sortedParticipants, usernames, users } = await validateParticipants(participants);

        const room = await findOrCreateRoom(sortedParticipants, usernames);

        await Promise.all(
            users.map(async (user) => {
                if (!user.rooms) user.rooms = [];
                if (!user.rooms.includes(room._id)) {
                    user.rooms.push(room._id);
                    await user.save();
                }
            })
        );

        const status = room.isNew ? 201 : 200;
        res.status(status).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Internal server error." });
    }
};


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

export const getRoomsOfUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const rooms = await Room.find({ participants: { $in: [userId] } });

        if (rooms.length === 0) {
            return res.status(404).json({ error: "No rooms found for this user" });
        }

        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
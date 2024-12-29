import Room from "../models/Room.js"

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
        const { participants } = req.body;

        const sortedParticipants = [...participants].sort();

        let room = await Room.findOne({ participants: sortedParticipants });

        if (!room) {
            await createRoom(sortedParticipants);
            return res.status(201).json(room);
        }

        res.status(200).json(room);

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
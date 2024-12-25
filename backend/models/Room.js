import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Message'
    }]
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
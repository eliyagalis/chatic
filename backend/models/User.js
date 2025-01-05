import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room'
    }]
    }, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
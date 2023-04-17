import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    avater: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
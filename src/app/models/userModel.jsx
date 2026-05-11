

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    image: {
        type: String, // Assuming you will store the path or URL of the image
        required: true // Adjust as needed
    }
    
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;





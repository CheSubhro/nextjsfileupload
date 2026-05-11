// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/app/models/userModel";
// import { NextResponse } from "next/server"

// export async function POST(request){
//     const { image } = await request.json();
//     await connect();
//     await User.create({ image });
//     return NextResponse.json({message:"User Page Created"},{status:201})
// }

// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/app/models/userModel";

// export async function POST(request) {
//     try {
//         const formData = request.body;
//         await connect();
//         await User.create({ image: formData.file });
//         return { status: 201, body: { message: "User Page Created" } };
//     } catch (error) {
//         console.error("Error creating user page:", error);
//         return { status: 500, body: { error: "An error occurred while creating user page" } };
//     }
// }

import multer from 'multer';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/app/models/userModel';

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory for uploaded files
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // Define the filename for uploaded files
    cb(null, file.originalname);
  }
});

// Set up multer upload
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false // Disabling body parsing as multer will handle it
  }
};

export default async function handler(req, res) {
  try {
    // Multer middleware to handle file upload
    upload.single('file')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A multer error occurred when uploading
        console.error('Multer error:', err);
        return res.status(400).json({ error: 'An error occurred while uploading the file' });
      } else if (err) {
        // An unexpected error occurred
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // File uploaded successfully, now save the user with file details
      await connect();
      await User.create({ image: '/uploads/' + req.file.filename });
      return res.status(201).json({ message: 'User Page Created' });
    });
  } catch (error) {
    console.error('Error creating user page:', error);
    return res.status(500).json({ error: 'An error occurred while creating user page' });
  }
}

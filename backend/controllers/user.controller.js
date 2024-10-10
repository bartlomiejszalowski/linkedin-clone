import User from "../models/user.model.js";

import cloudinaryConfig from "../lib/cloudinary.js";

export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");

    //find users who are not in the current user's connections
    // and also do not recommend our own profile

    const suggestedUser = await User.find({
      _id: {
        $ne: req.user._id, //excludes the current user themselves
        $nin: currentUser.connections, //finds all users who are not already in the current user's connections
      },
    })
      .select("name username profilePicture headline")
      .limit(3);

    res.json(suggestedUser);
  } catch (error) {
    console.log("Error in getSuggestedConnections controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPublicProfile = async (req, res) => {
  try {
    const userProfile = await User.findOne({
      username: req.params.username,
    }).select("-password");

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.log("Error in getPublicProfile controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "username",
      "headline",
      "about",
      "location",
      "profilePicture",
      "bannerImg",
      "skills",
      "experience",
      "education",
    ];

    const updatedData = {};

    for (const field of allowedFields) {
      // loop through the allowed fields
      if (req.body[field]) {
        // check if the field is present in the request body
        updatedData[field] = req.body[field]; // add the field to the updated data object
      }
    }

    if (req.body.profilePicture) {
      const result = await cloudinaryConfig.uploader.upload(
        req.body.profilePicture
      );

      updatedData.profilePicture = result.secure_url;
    }

    if (req.body.bannerImg) {
      const result = await cloudinaryConfig.uploader.upload(req.body.bannerImg);

      updatedData.bannerImg = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updatedData, // update the user with the updated data
      },
      {
        new: true, // return the updated user
      }
    ).select("-password"); // exclude the password field from the response

    res.json(user);
  } catch (error) {
    console.log("Error in updateProfile controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { sendCommentNotificationEmail } from "../emails/emailHandlers.js";
import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";

export const getFeedPosts = async (req, res) => {
  const posts = await Post.find({
    author: {
      $in: req.user.connections, // only fetch posts where the author is in the user's connections
    },
  })
    .populate("author", "name username profilePicture headline") // populate the author with name, username, and profilePicture
    .populate("comments.user", "name username profilePicture") // populate the comments with the user's name, username, and profilePicture
    .sort({ createdAt: -1 }); // sort the posts by creation date in descending order

  res.status(200).json(posts);

  try {
  } catch (error) {
    console.log("Error in getFeedPosts controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    let newPost;

    if (image) {
      const imgResult = await cloudinaryConfig.uploader.upload(image);
      newPost = new Post({
        author: req.user._id,
        content,
        image: imgResult.secure_url,
      });
    } else {
      newPost = new Post({
        author: req.user._id,
        content,
      });
    }

    await newPost.save();
    res.status(201).json(newPost); // 201 - Created
  } catch (error) {}
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" }); // 403 - unauthorized
    }

    // Delete the image from Cloudinary
    if (post.image) {
      await cloudinaryConfig.uploader.destroy(
        post.image.split("/").pop().split(".")[0]
        // extract the public_id from the image url
      );
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deletePost controller:", error);
    res.status(500).json({ message: "Internal server error" }); // 500 - Internal Server Error
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name username profilePicture headline");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post); // 200 - OK
  } catch (error) {
    console.log("Error in getPostById controller:", error);
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { user: req.user._id, content } },
      },
      { new: true }
    ).populate("author", "name username profilePicture headline");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // create a notification if the comment owner is not the post owner
    if (post.author.toString() !== req.user._id.toString()) {
      const newNotification = new Notification({
        recipient: post.author,
        type: "comment",
        relatedUser: req.user._id,
        relatedPost: postId,
      });
      await newNotification.save();

      //todo send email
      try {
        const postUrl = process.env.CLIENT_URL + "/post/" + postId;
        await sendCommentNotificationEmail(
          post.author.email,
          post.author.name,
          req.user.name,
          postUrl,
          content
        );
      } catch (error) {
        console.log("Error in sending comment notification email:", error);
      }
    }

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in createComment controller:", error);
  }
};

export const likePost = async () => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      //remove like
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      //like the post
      post.likes.push(userId);

      //create a notification if the post owner is not the user who liked the post
      const newNotification = new Notification({
        recipient: post.author,
        type: "like",
        relatedUser: userId,
        relatedPost: postId,
      });
      await newNotification.save();
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in likePost controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

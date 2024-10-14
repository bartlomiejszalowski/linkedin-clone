import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "name username profilePicture")
      .populate("relatedPost", "content image");

    res.staus(200).json(notifications);
  } catch (error) {
    console.log("Error in getUserNotifications controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const notificationId = req.params.id;
  try {
    const notification = await Notification.findByIdAndUpdate(
      { _id: notificationId, recipient: req.user._id }, // find the notification by id and recipient
      { read: true }, // mark the notification as read
      { new: true } // return the updated notification
    );

    res.json(notification);
  } catch (error) {
    console.log("Error in markNotificationAsRead controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req, res) => {
  const notificationId = req.params.id;
  try {
    await Notification.findOneAndDelete({
      _id: notificationId,
      recipient: req.user._id,
    });

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotification controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

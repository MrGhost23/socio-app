const Notification = require("../models/Notification");

const getNotificationsWithUserData = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.user._id })
      .populate(
        "sender",
        "firstName lastName username userPicture isRead createdAt _id"
      )
      .sort({ createdAt: -1 });

    const formattedNotifications = notifications.map((notification) => ({
      _id: notification._id,
      firstName: notification.sender.firstName,
      lastName: notification.sender.lastName,
      username: notification.sender.username,
      userPicture: notification.sender.userPicture,
      actionType: notification.actionType,
      postId: notification.postId,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
    }));

    formattedNotifications.sort((a, b) => b.createdAt - a.createdAt);

    res.json(formattedNotifications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const markAsReadNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    )
      .populate("sender", "firstName lastName userPicture isRead createdAt _id")
      .sort({ createdAt: -1 });

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const responseNotification = {
      _id: updatedNotification._id,
      firstName: updatedNotification.sender.firstName,
      lastName: updatedNotification.sender.lastName,
      userPicture: updatedNotification.sender.userPicture,
      actionType: updatedNotification.actionType,
      postId: updatedNotification.postId,
      isRead: updatedNotification.isRead,
      createdAt: updatedNotification.createdAt,
    };

    res.json(responseNotification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getNotificationsWithUserData,
  markAsReadNotification,
};

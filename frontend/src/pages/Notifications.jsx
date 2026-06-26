import { useEffect, useState } from "react";
import api from "../services/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(
        notifications.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
                {unreadCount} New
              </span>
            )}
          </h1>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔕</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No notifications</h3>
            <p className="text-slate-500">You're all caught up! Check back later.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-200 ${
                  notification.isRead
                    ? "bg-slate-50 border-slate-200 text-slate-600"
                    : "bg-white border-blue-200 shadow-sm text-slate-900"
                }`}
              >
                {/* Unread Indicator Line */}
                {!notification.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-2">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${notification.isRead ? "text-slate-700" : "text-slate-900"}`}>
                      {notification.title}
                    </h3>
                    <p className={`text-sm ${notification.isRead ? "text-slate-500" : "text-slate-600"}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-3 font-medium">
                      {new Date(notification.createdAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>

                  {/* Mark as Read Button */}
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="shrink-0 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 self-start"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
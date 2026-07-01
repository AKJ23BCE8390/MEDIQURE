import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes.js";
import chemistRoutes from "./routes/chemistRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import chemistOrderRoutes from "./routes/chemistOrderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import reviewRoutes from "./routes/reviewRoutes.js";

import { connectDB } from "./config/db.js";

import notificationRoutes from "./routes/notificationRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://mediqure.vercel.app"
        ],
        credentials: true
    })
);
app.use(express.json());

await connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chemist", chemistRoutes);
app.use("/api/products", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/cart", cartRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chemist", chemistOrderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/wishlist",wishlistRoutes);


app.get("/", (req, res) => {
  res.json({
    status: "online",
  });
});

const PORT = process.env.PORT || 3000;

/* ---------- Socket.IO ---------- */

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Client Connected:", socket.id);

  socket.on("join-order-room", (orderId) => {
    socket.join(orderId);
    console.log(`📦 Socket ${socket.id} joined order ${orderId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client Disconnected:", socket.id);
  });
});

/* ---------- Start Server ---------- */

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./Routes/auth";
import programRoutes from './Routes/program'
import memberShipRoutes from "./Routes/membrShip";
import connectDB from "./DBConnection/connection";

dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/program',programRoutes)
app.use('/api/memberShip',memberShipRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

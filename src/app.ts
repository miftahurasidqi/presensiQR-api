import express from "express";
import mongoose from "mongoose";
import expressWs from "express-ws";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import rutePegawai from "./routes/rutePegawai";
import ruteKehadiran from "./routes/ruteKehadiran";
import ruteWs from "./routes/ruteWs";

// absen_QR
// mongodb+srv://miftahurasidqi:Cedm4Ip6XI4f5kSy@cluster0.d3dl5wx.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://miftahurasidqi:Cedm4Ip6XI4f5kSy@cluster0.d3dl5wx.mongodb.net/presensi_QR
// mongodb://127.0.0.1:27017/presensi
dotenv.config();

const app = express();
expressWs(app);

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/api/pegawai", rutePegawai);
app.use("/api/kehadiran", ruteKehadiran);

ruteWs(app);

const PORT = process.env.PORT || 5030;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Terhubung dengan MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Gagal terhubung dengan MongoDB:", err);
  });

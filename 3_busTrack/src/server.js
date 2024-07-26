import "dotenv/config";
import express from "express";

import "./models/linhasModel.js";
import "./models/motoristasModel.js";
import "./models/onibusModel.js";

import onibusRoutes from "./routes/busTrackRoutes.js";

const PORT = process.env.PORT;

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/bus", onibusRoutes);

app.listen(PORT, () => {
  console.log("serv on port", PORT);
});
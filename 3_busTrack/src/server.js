import "dotenv/config"
import { Express } from "express"

import "./models/linhasModel"
import "./models/motoristasModel"
import "./models/onibusModel"

import onibusRoutes from "./routes/busTrackRoutes.js"

const PORT = process.env.PORT

const app = Express()
app  
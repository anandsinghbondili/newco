import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import divisionRoutes from "./routes/divisions";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/api/divisions", divisionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/api", (req, res) => {
    res.send({ status: "API is running 🚀" });
});
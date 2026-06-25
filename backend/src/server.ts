import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "@/routes/routes";
import { errorHandler } from "./middlewares/errors";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API!",
  });
});

app.get("/healthcheck", (req, res) => {
  res.json({
    message: "Server is running",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use("/api", routes);

app.set("Json Replacer", (key, value) => {
  if (value instanceof Date) {
    return value.toISOString().slice(19).replace("T", " ");
  }
  return value;
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}.`);
});

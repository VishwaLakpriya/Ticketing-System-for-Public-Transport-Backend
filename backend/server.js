import {} from "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

const { connect } = mongoose;

// Connect MongoDB.
const URI = process.env.MONGODB_URL;
connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

const app = express();
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  `Server running on port ${port} 🔥`;
  console.log(`Server running on port ${port} 🔥`);
});

//cloudinary imports
import imageUploadRoute from "./routes/imageUploadRoute.js";
import fileUploadRoute from "./routes/fileUploadRoute.js";
//route imports
import userRoute from "./routes/user.js";
import routeScheduleRoute from "./routes/routeSchedule.js";
import driverRoute from "./routes/driverRoutes.js";
import inspectorRoute from "./routes/inspector.js";
import journeyRoute from "./routes/journeyRoutes.js";
//routes
app.use("/api", imageUploadRoute);
app.use("/api", fileUploadRoute);

app.use(routeScheduleRoute);
app.use(userRoute);
app.use(driverRoute);
app.use(inspectorRoute);
app.use(journeyRoute);
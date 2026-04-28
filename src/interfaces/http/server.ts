import collectionRoutes from "@interfaces/routes/collectionRoutes";
import userRoutes from "@interfaces/routes/userRoutes";
import imageRoutes from "@interfaces/routes/ImageRoutes";
import express from "express";

export function createServer() {
  const app = express();

  //middlewares:
  app.use(express.json());

  //routes slices:
  app.use("/users", userRoutes);
  app.use("/collections", collectionRoutes);
  app.use("/images", imageRoutes);

  return app;
}

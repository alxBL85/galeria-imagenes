// src/interfaces/routes/imageRoutes.ts
import { Router } from "express";
import multer from "multer";

import { PrismaImageRepository } from "@infrastructure/database/repositories/PrismaImageRepository";
import { PrismaCollectionRepository } from "@infrastructure/database/repositories/PrismaCollectionRepository";

import { UploadImage } from "@application/use-cases/image/UploadImage";
import { GetCollectionImages } from "@application/use-cases/image/GetCollectionImages";

import { ImageController } from "@interfaces/controllers/ImageController";

const router = Router();
const upload = multer({ dest: "uploads/" });

const imageRepo = new PrismaImageRepository();
const collectionRepo = new PrismaCollectionRepository();

const uploadImage = new UploadImage(imageRepo, collectionRepo);
const getCollectionImages = new GetCollectionImages(imageRepo);

const controller = new ImageController(uploadImage, getCollectionImages);

router.post("/", upload.single("image"), controller.upload);
router.get("/collection/:collectionId", controller.listByCollection);

export default router;

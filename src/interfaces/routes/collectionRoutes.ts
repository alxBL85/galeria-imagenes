import { Router } from "express";
import { PrismaCollectionRepository } from "@infrastructure/database/repositories/PrismaCollectionRepository";
import { CreateCollection } from "@application/use-cases/collection/CreateCollection";
import { GetUserCollections } from "@application/use-cases/collection/GetUserCollections";
import { CollectionController } from "@interfaces/controllers/CollectionController";

const router = Router();

const repo = new PrismaCollectionRepository(); //infrastructure

const createCollection = new CreateCollection(repo); // use case
const getUserCollections = new GetUserCollections(repo); //use case

const controller = new CollectionController( //interface
  createCollection,
  getUserCollections,
);

router.post("/", controller.create);
router.get("/user/:userId", controller.listByUser);

export default router;

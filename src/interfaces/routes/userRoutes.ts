import { Router } from "express";
import { UserController } from "@interfaces/controllers/UserController";
import { PrismaUserRepository } from "@infrastructure/database/repositories/PrismaUserRepository";
import { CreateUser } from "@application/use-cases/user/CreateUser";

const router = Router();

const userRepo = new PrismaUserRepository(); // infrastructure
const createUser = new CreateUser(userRepo); // applicaton/use-case
const controller = new UserController(createUser); //interface

router.post("/", controller.register);

export default router;

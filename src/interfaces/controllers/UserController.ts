import { Request, Response } from "express";

import { CreateUser } from "@application/use-cases/user/CreateUser";

export class UserController {
  constructor(private createUser: CreateUser) {}

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.createUser.execute(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}

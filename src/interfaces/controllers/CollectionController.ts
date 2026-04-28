import { Request, Response } from "express";
import { CreateCollection } from "@application/use-cases/collection/CreateCollection";
import { GetUserCollections } from "@application/use-cases/collection/GetUserCollections";

export class CollectionController {
  constructor(
    private createCollection: CreateCollection,
    private getUserCollections: GetUserCollections,
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.createCollection.execute(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  listByUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await this.getUserCollections.execute(userId as string);

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}

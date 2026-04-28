import { Request, Response } from "express";
import { UploadImage } from "@application/use-cases/image/UploadImage";
import { GetCollectionImages } from "@application/use-cases/image/GetCollectionImages";

export class ImageController {
  constructor(
    private uploadImage: UploadImage,
    private getCollectionImages: GetCollectionImages,
  ) {}

  upload = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const file = req?.file;
      const result = await this.uploadImage.execute({
        name: body.name,
        description: body.description,
        path: file?.path ?? "",
        collectionId: body.collectionId,
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  listByCollection = async (req: Request, res: Response) => {
    try {
      const { collectionId } = req.params;
      const result = await this.getCollectionImages.execute(
        collectionId as string,
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}

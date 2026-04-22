import { ImageRepository } from "@domain/repositories/ImageRepository";
import { CollectionRepository } from "@domain/repositories/CollectionRepository";
import { Image } from "@domain/entities/Image";
import crypto from "crypto";

export class UploadImage {
  constructor(
    private imageRepo: ImageRepository,
    private collectionRepo: CollectionRepository,
  ) {}

  async execute(input: {
    name: string;
    description: string;
    path: string;
    collectionId: string;
  }) {
    // Validar colección
    const collection = await this.collectionRepo.findById(input.collectionId);

    if (!collection) {
      throw new Error("Collection not found");
    }

    const image = new Image(
      crypto.randomUUID(),
      input.name,
      input.description,
      input.path,
      new Date(),
      input.collectionId,
    );

    await this.imageRepo.save(image);

    return image;
  }
}

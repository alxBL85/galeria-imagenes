import { ImageRepository } from "@domain/repositories/ImageRepository";

export class GetCollectionImages {
  constructor(private imageRepo: ImageRepository) {}

  async execute(collectionId: string) {
    if (!collectionId) {
      throw new Error("CollectionId required");
    }

    return await this.imageRepo.findByCollection(collectionId);
  }
}

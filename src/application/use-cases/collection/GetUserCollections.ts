import { CollectionRepository } from "@domain/repositories/CollectionRepository";

export class GetUserCollections {
  constructor(private collectionRepo: CollectionRepository) {}

  async execute(userId: string) {
    if (!userId) {
      throw new Error("UserId required");
    }

    return await this.collectionRepo.findByUser(userId);
  }
}

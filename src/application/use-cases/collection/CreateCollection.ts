import { CollectionRepository } from "@domain/repositories/CollectionRepository";
import { Collection } from "@domain/entities/Collection";
import crypto from "crypto";

export class CreateCollection {
  constructor(private collectionRepo: CollectionRepository) {}

  async execute(input: { name: string; type: string; userId: string }) {
    if (!input.name) {
      throw new Error("Collection name required");
    }

    const collection = new Collection(
      crypto.randomUUID(),
      input.name,
      input.type,
      new Date(),
      input.userId,
    );

    await this.collectionRepo.create(collection);

    return collection;
  }
}

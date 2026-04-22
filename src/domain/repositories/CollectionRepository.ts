import { Collection } from "@domain/entities/Collection";

export interface CollectionRepository {
  create(collection: Collection): Promise<void>;
  findById(id: string): Promise<Collection | null>;
  findByUser(userId: string): Promise<Collection[]>;
}

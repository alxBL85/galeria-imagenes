import { Image } from "@domain/entities/Image";

export interface ImageRepository {
  save(image: Image): Promise<void>;
  findById(id: string): Promise<Image | null>;
  findByCollection(collectionId: string): Promise<Image[]>;
}

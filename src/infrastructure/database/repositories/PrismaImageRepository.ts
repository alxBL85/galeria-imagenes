import { ImageRepository } from "@domain/repositories/ImageRepository";
import { Image } from "@domain/entities/Image";
import { prisma } from "../prisma/client";

export class PrismaImageRepository implements ImageRepository {
  async save(image: Image): Promise<void> {
    await prisma.image.create({
      data: {
        id: image.id,
        name: image.name,
        description: image.description,
        path: image.path,
        createdAt: image.createdAt,
        collectionId: image.collectionId,
      },
    });
  }

  async findById(id: string): Promise<Image | null> {
    const data = await prisma.image.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Image(
      data.id,
      data.name,
      data.description,
      data.path,
      new Date(data.createdAt),
      data.collectionId,
    );
  }

  async findByCollection(collectionId: string): Promise<Image[]> {
    const rows = await prisma.image.findMany({
      where: { collectionId },
      orderBy: { createdAt: "desc" },
    });

    return rows.map(
      (row) =>
        new Image(
          row.id,
          row.name,
          row.description,
          row.path,
          new Date(row.createdAt),
          row.collectionId,
        ),
    );
  }
}

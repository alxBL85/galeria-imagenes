import { Collection } from "@domain/entities/Collection";
import { CollectionRepository } from "@domain/repositories/CollectionRepository";
import { Collection as PrismaCollection } from "@prisma/client";
import { prisma } from "../prisma/client";

export class PrismaCollectionRepository implements CollectionRepository {
  async create(collection: Collection): Promise<void> {
    await prisma.collection.create({
      data: {
        id: collection.id,
        name: collection.name,
        type: collection.type,
        createdAt: collection.createdAt,
        userId: collection.userId,
      },
    });
  }

  async findById(id: string): Promise<Collection | null> {
    const data = await prisma.collection.findUnique({ where: { id } });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByUser(userId: string): Promise<Collection[]> {
    const rows = await prisma.collection.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return rows.map(this.toDomain);
  }

  private toDomain(data: PrismaCollection): Collection {
    return new Collection(
      data.id,
      data.name,
      data.type,
      new Date(data.createdAt),
      data.userId,
    );
  }
}

import { User } from "@domain/entities/User";
import { UserRepository } from "@domain/repositories/UserRepository";
import { prisma } from "../prisma/client";

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({ where: { email } });

    if (!data) return null;

    return new User(data.id, data.email, data.password);
  }
}

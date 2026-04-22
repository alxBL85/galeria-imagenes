import { User } from "@domain/entities/User";

export interface UserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

//Crear un usuario validando reglas básicas.

import { User } from "@domain/entities/User";
import { UserRepository } from "@domain/repositories/UserRepository";

export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(input: { email: string; password: string }) {
    // validaciones básicas
    if (!input.email.includes("@")) {
      throw new Error("Invalid email");
    }

    if (input.password.length < 6) {
      throw new Error("Password too short");
    }

    // verificar duplicados
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new Error("User already exists");
    }

    // everything looks good
    const user = new User(
      crypto.randomUUID(),
      input.email,
      input.password, // TODO: hash de la contraseña
    );

    await this.userRepo.create(user);

    return user;
  }
}

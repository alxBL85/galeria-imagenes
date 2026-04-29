import { env } from "../../../config/env";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./client/client";

// Export all types from the generated client
export type * from "./client/models";

// Added to the global to implement a Singleton logic
declare global {
    var prismaGlobal: PrismaClient | undefined;
}

function generateClient(): PrismaClient {
 const connectionString = `${env.DATABASE_URL}`;
 const adapter = new PrismaBetterSqlite3({ url: connectionString});
 return new PrismaClient({ adapter });
}

const prisma = global.prismaGlobal ?? generateClient();

if (env.NODE_ENV !== "production") { 
    global.prismaGlobal = prisma;
}

export { prisma }
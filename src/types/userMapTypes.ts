import { UserMaps } from "@prisma/client";

export type UserMapsData = Omit<UserMaps, "id">;

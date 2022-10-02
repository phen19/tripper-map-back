import { States } from "@prisma/client";

export type StatesData = Omit<States, "id">;

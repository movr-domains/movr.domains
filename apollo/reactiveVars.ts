import { makeVar } from "@apollo/client";

export const searchedDomain = makeVar<string | null>(null);

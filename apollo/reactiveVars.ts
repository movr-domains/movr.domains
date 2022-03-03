import { makeVar } from '@apollo/client';

export const searchedDomain = makeVar<string | null>(null);
export const currentDomain = makeVar<string | null>(null);

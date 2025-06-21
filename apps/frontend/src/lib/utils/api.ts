// place files you want to import through the `$lib` alias in this folder.
import { hcWithType } from '@software_contest/backend/honoClient'

export const client = hcWithType(import.meta.env.VITE_Backend_URL);

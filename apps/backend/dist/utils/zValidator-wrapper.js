import { ZodSchema } from 'zod';
import { HTTPException } from 'hono/http-exception';
import { zValidator as zv } from '@hono/zod-validator';
export const zValidator = (target, schema) => zv(target, schema, (result) => {
    if (!result.success) {
        throw new HTTPException(400, { cause: result.error });
    }
});

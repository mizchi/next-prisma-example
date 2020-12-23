import type { NextApiHandler } from "next";
import * as z from "zod";
import { ism, varidatorFactory } from "@/lib/ism";
import { prisma } from "@/lib/prisma";

const endpoint = "/api/createPost";
const inputSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
});

type Input = z.infer<typeof inputSchema>;
type Output =
  | { ok: true }
  | {
      ok: false;
      error: z.ZodError;
    };

export const validateCreatePostInput = varidatorFactory<Input>(inputSchema);

export const createPost = ism<Input, Output>(endpoint, async (input) => {
  await prisma.post.create({
    data: {
      title: input.title,
      content: input.content,
      published: true,
    },
  });
  return { ok: true };
});

const handler: NextApiHandler = async (req, res) => {
  const validated = validateCreatePostInput(req.body);
  if (validated.valid) {
    const result = await createPost(validated.data);
    res.json(result);
  } else {
    res.status(400).end();
  }
};
export default handler;

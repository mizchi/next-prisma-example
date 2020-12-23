import type { NextApiHandler } from "next";
import prisma from "@/lib/prisma";
import * as z from "zod";

const requestBodySchema = z.object({
  title: z.string().min(1),
  content: z.string(),
});

export type CreatePostRequest = z.infer<typeof requestBodySchema>;

const handler: NextApiHandler = async (req, res) => {
  console.log(req.body, typeof req.body);
  try {
    const result = requestBodySchema.parse(req.body);
    await prisma.post.create({
      data: {
        title: result.title,
        content: result.content,
        published: true,
      },
    });
    res.json({
      ok: true,
    });
    return;
  } catch (error) {
    res.json({ ok: false, error });
  }
};
export default handler;

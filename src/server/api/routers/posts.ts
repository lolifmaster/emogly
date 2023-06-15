import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privatePrecedure, publicProcedure } from "~/server/api/trpc";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 2 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */ 
  prefix: "@upstash/ratelimit",
});

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  }
}

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });
    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 50,
    })).map(filterUserForClient);
    return posts.map( post => {
      const author = users.find(user => user.id === post.authorId);
      if (!author || !author.username) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author not found",
        })
      }
      return {
        post,
        author: {
          ...author,
          username: author.username,
        }
      }
      
    });
  }),

  create: privatePrecedure.input(z.object({
    content: z.string().emoji().min(1).max(280),
    })).mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      // Rate limit the user
      const { success } = await ratelimit.limit(authorId);
      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "You are doing that too much. Please try again later.",
        });
      }

      const newPost = await ctx.prisma.post.create({
        data: {
          authorId: authorId,
          content: input.content,
          title: "New Post",
        },
    })
    return newPost;
  }),
});




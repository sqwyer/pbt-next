import { z } from "zod";

import {
    adminProcedure,
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";



export const sessionRouter = createTRPCRouter({
  list: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.tutoringSession.findMany({
        orderBy: { createdAt: "desc"}
      })
    }),

    find: publicProcedure
      .input(z.object({
        id: z.string()
      }))
      .query(({ctx, input}) => {
        return ctx.db.tutoringSession.findUnique({
          where: {
            id: input.id
          }
        })
      }),

    update: adminProcedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          label: z.string().optional(),
          location: z.string().optional(),
          date: z.string().optional(),
          time: z.string().optional(),
          booked: z.boolean().optional()
        })
      }))
      .mutation(({ctx, input}) => {
        return ctx.db.tutoringSession.update({
          where: {
            id: input.id
          },
          data: input.data
        })
      }),

  create: adminProcedure
    .input(z.object({
        label: z.string(),
        location: z.string(),
        date: z.string(),
        time: z.string()
     }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tutoringSession.create({
        data: {
          label: input.label,
          location: input.location,
          date: input.date,
          time: input.time,
          booked: false,
        },
      });
    }),

    delete: adminProcedure
        .input(z.object({
            // id: z.number()
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.tutoringSession.delete({
                where: {
                    id: input.id
                }
            })
        })
});
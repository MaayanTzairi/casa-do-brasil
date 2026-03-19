import type { QueryParams } from "@sanity/client";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { sanityFetch } from "../sanity";

/**
 * Sanity CMS router — proxies GROQ queries server-side
 * so the API token is never exposed to the browser.
 */
export const sanityRouter = router({
  /** Connection test — fetches the Sanity project info */
  ping: publicProcedure.query(async () => {
    const result = await sanityFetch<{ _type: string }[]>(
      `*[_type == "settings"][0]{ _type }`,
      {}
    );
    return { ok: true, result };
  }),

  /** Generic GROQ query proxy */
  query: publicProcedure
    .input(
      z.object({
        groq: z.string().max(4000),
        params: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .query(async ({ input }) => {
      const data = await sanityFetch(input.groq, (input.params ?? {}) as QueryParams);
      return data;
    }),
});

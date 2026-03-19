import { createClient, type QueryParams, type QueryWithoutParams } from "@sanity/client";

/**
 * Server-side Sanity client.
 * Uses the secret API token — never expose this to the frontend.
 */
export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // server-side: always fresh
});

/**
 * Fetch a GROQ query from Sanity (server-side).
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params: QueryParams | QueryWithoutParams = {}
): Promise<T> {
  return sanityClient.fetch<T>(query, params as QueryParams);
}

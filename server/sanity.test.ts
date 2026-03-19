import { describe, expect, it } from "vitest";
import { sanityFetch } from "./sanity";

/**
 * Sanity connection test.
 * Validates that the SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_API_TOKEN
 * environment variables are set and the Sanity API is reachable.
 */
describe("Sanity CMS connection", () => {
  it("should have required environment variables", () => {
    expect(process.env.SANITY_PROJECT_ID).toBeTruthy();
    expect(process.env.SANITY_DATASET).toBeTruthy();
    expect(process.env.SANITY_API_TOKEN).toBeTruthy();
  });

  it("should connect to Sanity and return a valid response", async () => {
    // Simple query that always works even on an empty dataset
    const result = await sanityFetch<unknown[]>(
      `*[_type in ["settings", "homePage", "menuItem"]][0...1]`,
      {}
    );
    // Result should be an array (even if empty)
    expect(Array.isArray(result)).toBe(true);
  }, 15000); // 15s timeout for network call
});

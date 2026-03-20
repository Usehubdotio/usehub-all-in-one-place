import { describe, it, expect } from "vitest";
import { TOOLS, CATEGORIES } from "../index";

describe("USEHUB catalog integrity", () => {
    it("has categories", () => {
        expect(Array.isArray(CATEGORIES)).toBe(true);
        expect(CATEGORIES.length).toBeGreaterThan(0);
    });

    it("has tools", () => {
        expect(Array.isArray(TOOLS)).toBe(true);
        expect(TOOLS.length).toBeGreaterThan(0);
    });

    it("tool ids are unique", () => {
        const ids = TOOLS.map((tool) => tool.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    it("every tool has required fields", () => {
        for (const tool of TOOLS) {
            expect(tool.id).toBeTruthy();
            expect(tool.name).toBeTruthy();
            expect(tool.category).toBeTruthy();
            expect(tool.blurb).toBeTruthy();
            expect(tool.url).toMatch(/^https?:\/\//);
        }
    });

    it("every tool category exists in categories config", () => {
        const allowed = new Set(
            CATEGORIES.map((category) => category.key).filter((key) => key !== "all")
        );

        for (const tool of TOOLS) {
            expect(allowed.has(tool.category)).toBe(true);
        }
    });
});
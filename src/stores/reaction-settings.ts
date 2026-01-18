import { persistentMap } from "@nanostores/persistent";
import { atom, effect } from "nanostores";
import { z } from "zod";

export const rtConfigSchema = z.object({
    maxRounds: z.string().regex(/^\d+$/, "Must be a numeric string"),
    mouseClick: z.enum(["onrelease", "onpress"]),
    minDelayMS: z.string().regex(/^\d+$/, "Must be a numeric string"),
    maxDelayMS: z.string().regex(/^\d+$/, "Must be a numeric string"),
});

export type RTConfig = z.infer<typeof rtConfigSchema>;

export const defaultRTConfig: RTConfig = {
    maxRounds: "5",
    mouseClick: "onpress",
    minDelayMS: "2000",
    maxDelayMS: "6000",
};

export const $rtConfig = persistentMap<RTConfig>("config:", defaultRTConfig);

export const setRTConfig = (newConfig: Partial<RTConfig>) => {
    $rtConfig.set({
        ...$rtConfig.get(),
        ...newConfig,
    });
};

effect([$rtConfig], (config) => {
    if (typeof window === "undefined") return;

    // Validate config with Zod
    const result = rtConfigSchema.safeParse(config);

    if (!result.success) {
        // Log validation errors for debugging
        console.warn("Invalid config detected:", result.error.flatten());
        // Reset to default config
        $rtConfig.set(defaultRTConfig);
        return;
    }
    // Additional check for any missing keys (in case of app update)
    const defaultKeys = Object.keys(defaultRTConfig).sort();
    const configKeys = Object.keys(config).sort();

    if (JSON.stringify(defaultKeys) !== JSON.stringify(configKeys)) {
        console.warn("Config keys mismatch. Resetting to default.");
        $rtConfig.set(defaultRTConfig);
    }
});

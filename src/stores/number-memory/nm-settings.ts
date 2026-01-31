import { persistentMap } from "@nanostores/persistent";
import { effect } from "nanostores";
import { z } from "zod";

export const nmSettingsSchema = z
    .object({
        numDispDuration: z.string().regex(/^\d+$/, "Must be a numeric string"),
        additionalRoundTime: z
            .string()
            .regex(/^\d+$/, "Must be a numeric string"),
        mode: z.enum(["normal", "photo"]),
        numberType: z.enum(["serial", "random"]),
    })
    .required();

export type NMSettings = z.infer<typeof nmSettingsSchema>;

export const defaultNMSettings: NMSettings = {
    numDispDuration: "6000",
    additionalRoundTime: "500",
    mode: "normal",
    numberType: "serial",
};
export const $nmSettings = persistentMap<NMSettings>(
    "nm-settings:",
    defaultNMSettings,
);

export const setNMSettings = (newConfig: Partial<NMSettings>) => {
    $nmSettings.set({
        ...$nmSettings.get(),
        ...newConfig,
    });
};

effect([$nmSettings], (config) => {
    if (typeof window === "undefined") return;

    // Validate config with Zod
    const result = nmSettingsSchema.safeParse(config);

    if (!result.success) {
        // Log validation errors for debugging
        console.warn("Invalid config detected:", result.error);
        // Reset to default config
        $nmSettings.set(defaultNMSettings);
        return;
    }
    // Additional check for any missing keys (in case of app update)
    const defaultKeys = Object.keys(defaultNMSettings).sort();
    const configKeys = Object.keys(config).sort();

    if (JSON.stringify(defaultKeys) !== JSON.stringify(configKeys)) {
        console.warn("Config keys mismatch. Resetting to default.");
        $nmSettings.set(defaultNMSettings);
    }
});

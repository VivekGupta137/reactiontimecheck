export const getNumberSettings = (settings: Record<string, string>) => {
    const newSettings: Record<string, number | string> = {};
    Object.keys(settings).forEach((key) => {
        newSettings[key] = isNumeric(settings[key])
            ? parseInt(settings[key])
            : settings[key];
    });
    return newSettings;
};

export const getStringNumberSettings = (
    settings: Record<string, number | string>,
) => {
    const newSettings: Record<string, string> = {};
    Object.keys(settings).forEach((key) => {
        newSettings[key] = settings[key].toString();
    });
    return newSettings;
};

export function isNumeric(n: string): boolean {
    // Use type coercion with parseFloat, which parses the entire string
    // until it hits a non-numeric character
    return !isNaN(parseFloat(n)) && isFinite(n as any);
}

import CSettings from "@/components/settings/CSettings";
import NMForm from "./NMForm";
import { z } from "astro/zod";
import { useStore } from "@nanostores/react";
import {
    $nmSettings,
    defaultNMSettings,
    setNMSettings,
} from "@/stores/number-memory/nm-settings";
import {
    getNumberSettings,
    getStringNumberSettings,
} from "@/components/utils/common-settings-utils";

const schema = z
    .object({
        numDispDuration: z.number().min(100).max(10000),
        additionalRoundTime: z.number().min(0).max(10000),
        numberType: z.enum(["serial", "random"]),
    })
    .required();

const NMSettings = () => {
    const nmSettings = useStore($nmSettings);

    const loadedValues = getNumberSettings(nmSettings);
    const defaultValues = getNumberSettings(defaultNMSettings);

    const onSubmit = (data: typeof schema._type) => {
        const stringData = getStringNumberSettings(data);
        setNMSettings(stringData);
    };

    return (
        <CSettings
            defaultValues={defaultValues}
            loadedValues={loadedValues}
            onSubmit={onSubmit}
            schema={schema}
        >
            <NMForm />
        </CSettings>
    );
};

export default NMSettings;

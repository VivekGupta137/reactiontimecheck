import CSettings from "@/components/settings/CSettings";
import { z } from "astro/zod";
import RCForm from "./RCForm";
import { useStore } from "@nanostores/react";
import {
    $rtConfig,
    defaultRTConfig,
    setRTConfig,
} from "@/stores/reaction-settings";

const schema = z
    .object({
        maxRounds: z.number().min(1).max(100),
        mouseClick: z.enum(["onrelease", "onpress"]),
        delayRange: z
            .tuple([z.number().min(0), z.number().min(0)])
            .refine((val) => val[0] < val[1], {
                message: "Minimum delay must be less than maximum delay",
            }),
    })
    .required();

const RCSettings = () => {
    const rtConfig = useStore($rtConfig);
    const loadedValues = {
        maxRounds: parseInt(rtConfig.maxRounds),
        mouseClick: rtConfig.mouseClick,
        delayRange: [
            parseInt(rtConfig.minDelayMS),
            parseInt(rtConfig.maxDelayMS),
        ] as [number, number],
    };
    const defaultValues = {
        maxRounds: parseInt(defaultRTConfig.maxRounds),
        mouseClick: defaultRTConfig.mouseClick,
        delayRange: [
            parseInt(defaultRTConfig.minDelayMS),
            parseInt(defaultRTConfig.maxDelayMS),
        ] as [number, number],
    };

    const onSubmit = (data: typeof schema._type) => {
        const { maxRounds, mouseClick, delayRange } = data;
        setRTConfig({
            maxRounds: maxRounds.toString(),
            mouseClick,
            minDelayMS: delayRange[0].toString(),
            maxDelayMS: delayRange[1].toString(),
        });
    };

    return (
        <CSettings
            defaultValues={defaultValues}
            loadedValues={loadedValues}
            onSubmit={onSubmit}
            schema={schema}
        >
            <RCForm />
        </CSettings>
    );
};

export default RCSettings;

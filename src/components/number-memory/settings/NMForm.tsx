import FormInputNumber from "@/components/form/FormInputNumber";
import FormSlider from "@/components/form/FormSlider";
import FormList from "@/components/settings/FormList";
import React from "react";
import { useFormContext } from "react-hook-form";
import CustomModes from "./CustomModes";
import FormTabs from "@/components/form/FormTabs";
import { Tab } from "@heroui/react";

const NMForm = () => {
    const {
        formState: { errors },
    } = useFormContext();
    return (
        <>
            <FormList title="Modes">
                <CustomModes />
            </FormList>
            <FormList
                title="Numbers mode"
                error={errors.numberType?.message as string}
            >
                <FormTabs
                    name="numberType"
                    className=""
                >
                    <Tab
                        key="serial"
                        title="Sequential"
                    />
                    <Tab
                        key="random"
                        title="Random"
                    />
                </FormTabs>
            </FormList>
            <FormList
                title="Number Display Duration (ms)"
                error={errors.numDispDuration?.message as string}
            >
                <FormSlider
                    name="numDispDuration"
                    // label="Number Display Duration (ms)"
                    minValue={100}
                    maxValue={10000}
                    step={100}
                    size="sm"
                    showTooltip
                    className="overflow-hidden"
                />
            </FormList>
            <FormList
                title="Additional Round Time (ms)"
                error={errors.additionalRoundTime?.message as string}
            >
                <FormSlider
                    name="additionalRoundTime"
                    // label="Additional Round Time (ms)"
                    minValue={0}
                    maxValue={10000}
                    step={100}
                    size="sm"
                    showTooltip
                    className="overflow-hidden"
                />
            </FormList>
        </>
    );
};

export default NMForm;

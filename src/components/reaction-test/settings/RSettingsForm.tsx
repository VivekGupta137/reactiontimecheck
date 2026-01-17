import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import FormList from "./FormList";
import FormInput from "@/components/form/FormInput";
import FormInputNumber from "@/components/form/FormInputNumber";
import FormTabs from "@/components/form/FormTabs";
import { Tab } from "@heroui/react";
import FormSlider from "@/components/form/FormSlider";
import { useStore } from "@nanostores/react";
import { $rtConfig } from "@/stores/reaction-settings";

const RSettingsForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const {
        handleSubmit,
        formState: { errors },
    } = useFormContext();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
        >
            <FormList
                title="Max Rounds"
                error={errors.maxRounds?.message as string}
            >
                <FormInputNumber
                    name="maxRounds"
                    type="number"
                    hideStepper={false}
                    className=""
                    fullWidth={false}
                />
            </FormList>
            <FormList
                title="Mouse Click setting"
                error={errors.mouseClick?.message as string}
            >
                <FormTabs
                    name="mouseClick"
                    className=""
                >
                    <Tab
                        key="onrelease"
                        title="On Release"
                    />
                    <Tab
                        key="onpress"
                        title="On Press"
                    />
                </FormTabs>
            </FormList>
            <FormList
                title="Wait screen delay"
                error={errors.delayRange?.message as string}
            >
                <FormSlider
                    name="delayRange"
                    label="Delay Range (ms)"
                    minValue={100}
                    maxValue={30000}
                    step={100}
                    size="sm"
                    showTooltip
                    className="overflow-hidden"
                />
            </FormList>
        </form>
    );
};

export default RSettingsForm;

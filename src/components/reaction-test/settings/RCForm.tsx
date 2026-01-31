import { useFormContext } from "react-hook-form";
import FormList from "@/components/settings/FormList";
import FormInputNumber from "@/components/form/FormInputNumber";
import FormTabs from "@/components/form/FormTabs";
import { Tab } from "@heroui/react";
import FormSlider from "@/components/form/FormSlider";

const RCForm = () => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <>
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
                title="Click Register Mode"
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
        </>
    );
};

export default RCForm;

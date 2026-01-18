import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from "@heroui/react";
import { CogIcon, TriangleAlert } from "lucide-react";
import RSettingsForm from "./RSettingsForm";
import { FormProvider, useForm } from "react-hook-form";
import FormList from "./FormList";
import FormInput from "@/components/form/FormInput";
import FormInputNumber from "@/components/form/FormInputNumber";
import FormTabs from "@/components/form/FormTabs";
import { Tab } from "@heroui/react";
import FormSlider from "@/components/form/FormSlider";
import { useStore } from "@nanostores/react";
import {
    $rtConfig,
    defaultRTConfig,
    setRTConfig,
} from "@/stores/reaction-settings";
import { z } from "astro/zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const RSettings = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    const methods = useForm({
        defaultValues: loadedValues,
        resolver: zodResolver(schema),
    });
    const { handleSubmit } = methods;
    const onSubmit = (data: any) => {
        const { maxRounds, mouseClick, delayRange } = data;
        setRTConfig({
            maxRounds: maxRounds.toString(),
            mouseClick,
            minDelayMS: delayRange[0].toString(),
            maxDelayMS: delayRange[1].toString(),
        });
    };
    return (
        <>
            <Button
                endContent={<CogIcon size={16} />}
                color="warning"
                variant="flat"
                onPress={onOpen}
                disableRipple
            >
                Settings
            </Button>
            <FormProvider {...methods}>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    backdrop="blur"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col  ">
                                    <h2 className="font-bold">Customize</h2>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Customize Your Reaction Test Settings
                                    </p>
                                </ModalHeader>
                                <ModalBody>
                                    <RSettingsForm onSubmit={onSubmit} />
                                </ModalBody>
                                <ModalFooter className="justify-between flex-wrap flex-col">
                                    <Button
                                        color="warning"
                                        startContent={
                                            <TriangleAlert size={16} />
                                        }
                                        variant="faded"
                                        onPress={() => {
                                            methods.reset(defaultValues);
                                        }}
                                        disableRipple
                                    >
                                        Restore Defaults
                                    </Button>
                                    <div className="flex ">
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onPress={onClose}
                                            className="grow"
                                            disableRipple
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="success"
                                            className="grow"
                                            onPress={() =>
                                                handleSubmit((data) => {
                                                    onSubmit(data);
                                                    onClose();
                                                })()
                                            }
                                            disableRipple
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </FormProvider>
        </>
    );
};

export default RSettings;

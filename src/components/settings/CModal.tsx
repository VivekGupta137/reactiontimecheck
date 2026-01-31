import React, { useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { CogIcon, TriangleAlert } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import CSettingsForm from "./CSettingsForm";
import { zodResolver } from "@hookform/resolvers/zod";

const CModal = ({
    isOpen,
    onOpenChange,
    onSubmit,
    loadedValues,
    defaultValues,
    children,
    schema,
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: any) => void;
    loadedValues: any;
    defaultValues: any;
    children: React.ReactNode;
    schema: any;
}) => {
    const methods = useForm({
        defaultValues: loadedValues,
        resolver: zodResolver(schema),
    });
    const { handleSubmit, reset } = methods;

    useEffect(() => {
        // Reset form values when modal is opened
        if (isOpen) {
            reset(loadedValues);
        }
    }, [isOpen, loadedValues, reset]);

    return (
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
                                <h2 className="font-bold">Settings</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                    Customize Your Test Settings
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <CSettingsForm onSubmit={onSubmit}>
                                    {children}
                                </CSettingsForm>
                            </ModalBody>
                            <ModalFooter className="justify-between flex-wrap flex-col">
                                <Button
                                    color="warning"
                                    startContent={<TriangleAlert size={16} />}
                                    variant="faded"
                                    onPress={() => {
                                        reset(defaultValues);
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
    );
};

export default CModal;

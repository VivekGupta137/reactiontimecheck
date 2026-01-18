import { Button, Tooltip } from "@heroui/react";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import { CircleQuestionMark, X } from "lucide-react";
const FloatingFAQ = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Tooltip content="Frequently Asked Questions">
                <Button
                    onPress={onOpen}
                    className="fixed bottom-4 right-4"
                    isIconOnly
                >
                    <CircleQuestionMark size={24} />
                </Button>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="px-2 text-3xl leading-7 text-center">
                                    <span className="inline-block ">FAQs</span>
                                </h2>
                            </ModalHeader>
                            <ModalBody className="px-0">{children}</ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    startContent={<X size={16} />}
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default FloatingFAQ;

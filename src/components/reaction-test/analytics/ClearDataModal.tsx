import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";

interface ClearDataModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onConfirm: () => void;
}

const ClearDataModal: React.FC<ClearDataModalProps> = ({
    isOpen,
    onOpenChange,
    onConfirm,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Clear Analytics Data
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Are you sure you want to delete all analytics
                                data? This will permanently remove all reaction
                                time records, attempts, and historical data from
                                your browser's storage.
                            </p>
                            <p className="text-danger font-semibold">
                                This action cannot be undone.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="default"
                                variant="light"
                                onPress={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="danger"
                                onPress={onConfirm}
                            >
                                Clear All Data
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ClearDataModal;

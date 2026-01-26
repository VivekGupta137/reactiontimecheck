import React from "react";
import { Button, InputOtp } from "@heroui/react";
import { FormProvider, useForm } from "react-hook-form";
import FormInputOtp from "@/components/form/FormInputOtp";
import { useStore } from "@nanostores/react";
import {
    $currentRound,
    $currentSequence,
    nmsNextRound,
    nmsTransitionTo,
} from "@/stores/number-memory/nm-state";
import { Verified, VerifiedIcon } from "lucide-react";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import { z } from "astro/zod";

import { zodResolver } from "@hookform/resolvers/zod";

const NMSeqInp = () => {
    const currentSequence = useStore($currentSequence);
    const currentRound = useStore($currentRound);

    // Form validation schema
    const validationSchema = z.object({
        sequenceInput: z
            .string()
            .max(
                currentSequence.length,
                `Input must be at most ${currentSequence.length} characters`,
            )
            .min(
                currentSequence.length,
                `Input must be exactly ${currentSequence.length} characters`,
            )
            .regex(/^\d+$/, "Input must contain only digits"),
    });

    const resolver = zodResolver(validationSchema);

    const methods = useForm<{ sequenceInput: string }>({
        defaultValues: {
            sequenceInput: "",
        },
        mode: "onBlur",
        resolver,
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: { sequenceInput: string }) => {
        console.log("Submitted sequence input:", data.sequenceInput);
        // Here you would typically validate the input against the expected sequence
        if (data.sequenceInput === currentSequence) {
            console.log("Correct sequence!");
            // Increase round or sequence length as needed
            nmsNextRound();
            // Transition to next state, e.g., show next sequence or complete
            nmsTransitionTo("seq-disp");
        } else {
            console.log("Incorrect sequence. Correct was:", currentSequence);
            nmsTransitionTo("complete");
        }
    };

    return (
        <FormProvider {...methods}>
            <h2 className="text-2xl mb-4 text-center text-default-500">
                Round - <span className="jetbrains-mono">{currentRound}</span>
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-2 flex-col items-center w-full px-4"
            >
                {/* {currentSequence.length <= 3 && (
                    <FormInputOtp
                        name="sequenceInput"
                        length={currentSequence.length}
                        autoFocus
                        isRequired
                        className="self-center"
                    />
                )} */}
                <FormInput
                    name="sequenceInput"
                    size="lg"
                    label="Enter the sequence you just saw"
                    labelPlacement="outside"
                    placeholder=""
                    isRequired
                    className="max-w-full text-2xl jetbrains-mono "
                    classNames={{ input: "text-center" }}
                    isClearable
                    autoFocus
                    inputMode="numeric"
                    description={
                        'Press Enter or click "Verify Sequence" when done.'
                    }
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="shadow"
                    endContent={<VerifiedIcon size={20} />}
                >
                    Verify Sequence
                </Button>
            </form>
        </FormProvider>
    );
};

export default NMSeqInp;

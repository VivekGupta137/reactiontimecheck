import { useFormContext } from "react-hook-form";
import FormList from "@/components/settings/FormList";
import FormInputNumber from "@/components/form/FormInputNumber";
import FormTabs from "@/components/form/FormTabs";
import { Tab } from "@heroui/react";
import FormSlider from "@/components/form/FormSlider";

const CSettingsForm = ({
    onSubmit,
    children,
}: {
    onSubmit: (data: any) => void;
    children: React.ReactNode;
}) => {
    const { handleSubmit } = useFormContext();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
        >
            {children}
        </form>
    );
};

export default CSettingsForm;

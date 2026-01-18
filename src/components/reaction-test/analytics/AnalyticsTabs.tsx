import React from "react";
import { Tabs, Tab } from "@heroui/react";
import type { TimePeriod } from "@/stores/types";
import { TIME_PERIODS } from "./constants";

interface AnalyticsTabsProps {
    selectedPeriod: TimePeriod;
    onPeriodChange: (period: TimePeriod) => void;
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({
    selectedPeriod,
    onPeriodChange,
}) => {
    return (
        <Tabs
            selectedKey={selectedPeriod}
            onSelectionChange={(key) => onPeriodChange(key as TimePeriod)}
            size="sm"
            radius="sm"
            isVertical={true}
            classNames={{
                base: "w-full sm:flex-row flex-col",
                tabList: "bg-default-100 p-1 sm:flex-row flex-col",
                cursor: "bg-background dark:bg-default shadow-small",
                tab: "h-7 text-tiny sm:w-auto w-full",
                tabContent:
                    "group-data-[selected=true]:text-default-foreground",
            }}
        >
            {TIME_PERIODS.map(({ key, label }) => (
                <Tab
                    key={key}
                    title={label}
                />
            ))}
        </Tabs>
    );
};

export default AnalyticsTabs;

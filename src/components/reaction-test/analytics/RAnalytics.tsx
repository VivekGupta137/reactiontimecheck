import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    useDisclosure,
} from "@heroui/react";
import {
    $selectedPeriod,
    $currentPeriodData,
    resetAnalyticsData,
} from "@/stores/reaction-analytics";
import type { TimePeriod } from "@/stores/types";
import { MoreVertical } from "lucide-react";
import AnalyticsTabs from "./AnalyticsTabs";
import AnalyticsMetrics from "./AnalyticsMetrics";
import AnalyticsChart from "./AnalyticsChart";
import TrendMetrics from "./TrendMetrics";
import ClearDataModal from "./ClearDataModal";

const RAnalytics = () => {
    const selectedPeriod = useStore($selectedPeriod);
    const currentData = useStore($currentPeriodData);
    const [activeMetric, setActiveMetric] = useState<string>("averageTime");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const chartData =
        currentData.chartData[
            activeMetric as keyof typeof currentData.chartData
        ] || currentData.chartData.averageTime;

    const handleClearData = () => {
        resetAnalyticsData();
        onOpenChange();
    };

    return (
        <Card className="relative max-w-3xl mx-auto">
            <CardHeader className="flex flex-col gap-y-2 p-6">
                <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex flex-col gap-y-0">
                        <dt className="text-medium text-foreground font-medium">
                            Analytics
                        </dt>
                    </div>
                    <span
                        aria-hidden="true"
                        className="w-px h-px block"
                        style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }}
                    />
                    <AnalyticsTabs
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={(period) => $selectedPeriod.set(period)}
                    />
                    <AnalyticsMetrics
                        data={currentData}
                        activeMetric={activeMetric}
                        onMetricClick={setActiveMetric}
                    />
                </div>
            </CardHeader>
            <CardBody className="p-0">
                <AnalyticsChart data={chartData} />
                <div className="p-6 pt-4">
                    <TrendMetrics data={currentData} />
                </div>
            </CardBody>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        size="sm"
                        className="absolute top-2 right-2 z-10 min-w-8 h-8"
                    >
                        <MoreVertical size={16} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Analytics Actions">
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onPress={onOpen}
                    >
                        Clear All Data
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <ClearDataModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onConfirm={handleClearData}
            />
        </Card>
    );
};

export default RAnalytics;

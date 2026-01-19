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
} from "@/stores/reaction-analytics";
import {
    $averageTimeChartData,
    $bestTimeChartData,
    $totalAttemptsChartData,
    $successRateChartData,
} from "@/stores/metric-calculators";
import { clearTestResults } from "@/stores/reaction-test-results";
import { generateDummyData } from "@/stores/dummy-data-generator";
import type { TimePeriod } from "@/stores/types";
import { DeleteIcon, MoreVertical, Trash2, RefreshCw } from "lucide-react";
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

    // Chart data stores
    const averageTimeChart = useStore($averageTimeChartData);
    const bestTimeChart = useStore($bestTimeChartData);
    const totalAttemptsChart = useStore($totalAttemptsChartData);
    const successRateChart = useStore($successRateChartData);

    // Get chart data based on active metric
    const chartData =
        {
            averageTime: averageTimeChart,
            bestTime: bestTimeChart,
            totalAttempts: totalAttemptsChart,
            successRate: successRateChart,
        }[activeMetric] || averageTimeChart;

    // Determine metric type for chart formatting
    const getMetricType = (
        metric: string,
    ): "time" | "attempts" | "percentage" => {
        if (metric === "totalAttempts") return "attempts";
        if (metric === "successRate") return "percentage";
        return "time";
    };

    const handleClearData = () => {
        clearTestResults();
        onOpenChange();
    };

    const handleFillDummyData = () => {
        clearTestResults();
        generateDummyData("6-months");
    };

    return (
        <Card
            className="relative max-w-3xl mx-auto"
            suppressHydrationWarning
        >
            <CardHeader className="flex flex-col gap-y-2 p-6">
                <div
                    className="flex flex-col gap-y-2 w-full"
                    suppressHydrationWarning
                >
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
            <CardBody
                className="p-0"
                suppressHydrationWarning
            >
                <AnalyticsChart
                    data={chartData}
                    metricType={getMetricType(activeMetric)}
                />
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
                    {import.meta.env.DEV ? (
                        <DropdownItem
                            key="fill-dummy"
                            color="warning"
                            onPress={handleFillDummyData}
                            endContent={<RefreshCw size={16} />}
                        >
                            Fill Dummy Data
                        </DropdownItem>
                    ) : null}
                    <DropdownItem
                        color="danger"
                        key="clear"
                        onPress={onOpen}
                        endContent={<Trash2 size={16} />}
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

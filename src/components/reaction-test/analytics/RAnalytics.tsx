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
    CardFooter,
    Divider,
    Link,
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
import {
    DeleteIcon,
    MoreVertical,
    Trash2,
    RefreshCw,
    ShieldCheck,
    ExternalLink,
} from "lucide-react";
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
            className="relative max-w-6xl mx-auto shadow-lg"
            suppressHydrationWarning
            isFooterBlurred
        >
            <CardHeader className="flex flex-col gap-y-3 p-6 pb-4 bg-gradient-to-br from-default-50 to-default-100">
                <div
                    className="flex flex-col gap-y-4 w-full"
                    suppressHydrationWarning
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-foreground">
                            Performance Analytics
                        </h2>
                    </div>
                    <AnalyticsTabs
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={(period) => $selectedPeriod.set(period)}
                    />
                </div>
            </CardHeader>
            <CardBody
                className="p-6 space-y-6"
                suppressHydrationWarning
            >
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-default-600 px-1">
                        Key Metrics
                    </h3>
                    <AnalyticsMetrics
                        data={currentData}
                        activeMetric={activeMetric}
                        onMetricClick={setActiveMetric}
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-default-600 px-1">
                        Performance Chart
                    </h3>
                    <div className="bg-default-50 rounded-lg overflow-hidden border border-default-200">
                        <AnalyticsChart
                            data={chartData}
                            metricType={getMetricType(activeMetric)}
                        />
                    </div>
                </div>
                <TrendMetrics data={currentData} />
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
            <Divider />
            <CardFooter className="justify-between">
                <p className="text-sm text-slate-300 ">
                    <ShieldCheck
                        className="inline-block text-success"
                        size={18}
                    />
                    <span>&nbsp; Your data is never stored on any server.</span>
                </p>
                <Link
                    showAnchorIcon
                    anchorIcon={
                        <ExternalLink
                            size={14}
                            className="ml-2"
                        />
                    }
                    underline="hover"
                    href="/reaction-time-test/"
                    className="text-sm text-default-500"
                >
                    &larr; Back to Reaction Test
                </Link>
            </CardFooter>
        </Card>
    );
};

export default RAnalytics;

import React from "react";
import TrendCard from "./TrendCard";
import type { AnalyticsData } from "@/stores/reaction-analytics";
import { TREND_METRICS, type TrendMetricKey } from "./constants";

interface TrendMetricsProps {
    data: AnalyticsData;
}

const TrendMetrics: React.FC<TrendMetricsProps> = ({ data }) => {
    return (
        <div className="mt-6">
            {/* Performance Metrics Section */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-default-600 mb-3 px-1">
                    Performance Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <TrendCard
                        title={TREND_METRICS.consistencyScore.title}
                        value={TREND_METRICS.consistencyScore.format(
                            data.trendMetrics.consistencyScore.value,
                        )}
                        change={data.trendMetrics.consistencyScore.change}
                        changeType={
                            data.trendMetrics.consistencyScore.changeType
                        }
                        trendType={data.trendMetrics.consistencyScore.trendType}
                    />
                    <TrendCard
                        title={TREND_METRICS.medianTime.title}
                        value={TREND_METRICS.medianTime.format(
                            data.trendMetrics.medianTime.value,
                        )}
                        change={data.trendMetrics.medianTime.change}
                        changeType={data.trendMetrics.medianTime.changeType}
                        trendType={data.trendMetrics.medianTime.trendType}
                    />
                    <TrendCard
                        title={TREND_METRICS.falseStartRate.title}
                        value={TREND_METRICS.falseStartRate.format(
                            data.trendMetrics.falseStartRate.value,
                        )}
                        change={data.trendMetrics.falseStartRate.change}
                        changeType={data.trendMetrics.falseStartRate.changeType}
                        trendType={data.trendMetrics.falseStartRate.trendType}
                    />
                </div>
            </div>

            {/* Progress Tracking Section */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-default-600 mb-3 px-1">
                    Progress Tracking
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <TrendCard
                        title={TREND_METRICS.personalRecord.title}
                        value={TREND_METRICS.personalRecord.format(
                            data.trendMetrics.personalRecord.value,
                        )}
                        change={data.trendMetrics.personalRecord.change}
                        changeType={data.trendMetrics.personalRecord.changeType}
                        trendType={data.trendMetrics.personalRecord.trendType}
                    />
                    <TrendCard
                        title={TREND_METRICS.longestWinStreak.title}
                        value={TREND_METRICS.longestWinStreak.format(
                            data.trendMetrics.longestWinStreak.value,
                        )}
                        change={data.trendMetrics.longestWinStreak.change}
                        changeType={
                            data.trendMetrics.longestWinStreak.changeType
                        }
                        trendType={data.trendMetrics.longestWinStreak.trendType}
                    />
                    <TrendCard
                        title={TREND_METRICS.practiceStreak.title}
                        value={TREND_METRICS.practiceStreak.format(
                            data.trendMetrics.practiceStreak.value,
                        )}
                        change={data.trendMetrics.practiceStreak.change}
                        changeType={data.trendMetrics.practiceStreak.changeType}
                        trendType={data.trendMetrics.practiceStreak.trendType}
                    />
                </div>
            </div>

            {/* Comparative & Training Metrics Section */}
            <div>
                <h3 className="text-sm font-semibold text-default-600 mb-3 px-1">
                    Insights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TrendCard
                        title={TREND_METRICS.percentileRank.title}
                        value={TREND_METRICS.percentileRank.format(
                            data.trendMetrics.percentileRank.value,
                        )}
                        change={data.trendMetrics.percentileRank.change}
                        changeType={data.trendMetrics.percentileRank.changeType}
                        trendType={data.trendMetrics.percentileRank.trendType}
                    />
                    <TrendCard
                        title={TREND_METRICS.totalPracticeTime.title}
                        value={TREND_METRICS.totalPracticeTime.format(
                            data.trendMetrics.totalPracticeTime.value,
                        )}
                        change={data.trendMetrics.totalPracticeTime.change}
                        changeType={
                            data.trendMetrics.totalPracticeTime.changeType
                        }
                        trendType={
                            data.trendMetrics.totalPracticeTime.trendType
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default TrendMetrics;

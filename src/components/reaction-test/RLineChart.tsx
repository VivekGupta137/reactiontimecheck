import React from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

/**
 * Generates data for a normal distribution curve representing reaction time
 * @param mean - Mean reaction time in ms (default: 250)
 * @param stdDev - Standard deviation in ms (default: 40)
 * @param minTime - Minimum time on x-axis (default: 0)
 * @param maxTime - Maximum time on x-axis (default: 600)
 * @param points - Number of data points to generate (default: 100)
 * @returns Array of data points with reactionTime (ms) and percentile (%)
 */
const generateReactionTimeDistribution = (
    mean: number = 250,
    stdDev: number = 40,
    minTime: number = 0,
    maxTime: number = 500,
    points: number = 100
) => {
    const data = [];
    const step = (maxTime - minTime) / points;

    for (let i = 0; i <= points; i++) {
        const x = minTime + i * step;
        // Normal distribution probability density function
        const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
        const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
        const y = coefficient * Math.exp(exponent);

        // Convert to percentage for better readability (scale up)
        const percentile = y * 100 * stdDev;

        data.push({
            reactionTime: Math.round(x),
            percentile: parseFloat(percentile.toFixed(2)),
        });
    }

    return data;
};

const generateCombinedData = (
    minTime: number = 0,
    maxTime: number = 500,
    points: number = 300
) => {
    const step = (maxTime - minTime) / points;
    const data = [];

    for (let i = 0; i <= points; i++) {
        const x = minTime + i * step;

        // Average people distribution (mean: 270ms, stdDev: 50ms)
        // Based on research: typical visual reaction time is 250-280ms
        const avgExponent = -Math.pow(x - 270, 2) / (2 * Math.pow(50, 2));
        const avgCoefficient = 1 / (50 * Math.sqrt(2 * Math.PI));
        const avgY = avgCoefficient * Math.exp(avgExponent);
        const avgPercentile = avgY * 100 * 50;

        // Gamer distribution (mean: 190ms, stdDev: 40ms)
        // Gamers/esports players: 180-220ms with tighter distribution
        const gamerExponent = -Math.pow(x - 190, 2) / (2 * Math.pow(40, 2));
        const gamerCoefficient = 1 / (40 * Math.sqrt(2 * Math.PI));
        const gamerY = gamerCoefficient * Math.exp(gamerExponent);
        const gamerPercentile = gamerY * 100 * 40;

        data.push({
            reactionTime: Math.round(x),
            average: parseFloat(avgPercentile.toFixed(2)),
            gamer: parseFloat(gamerPercentile.toFixed(2)),
        });
    }

    return data;
};

const data = generateCombinedData(0, 500, 300);

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border border-default-200 rounded-lg shadow-lg p-3">
                <p className="text-sm font-semibold mb-2">
                    Reaction Time: {payload[0].payload.reactionTime}ms
                </p>
                {payload.map((entry: any, index: number) => (
                    <p
                        key={index}
                        className="text-sm"
                        style={{ color: entry.color }}
                    >
                        {entry.name === "average" ? "Average" : "Gamer"}:{" "}
                        {entry.value.toFixed(2)}%
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const RLineChart = () => {
    return (
        <AreaChart
            style={{
                width: "100%",
                aspectRatio: 1.618,
                maxWidth: 800,
                margin: "auto",
            }}
            responsive
            data={data}
        >
            <defs>
                <linearGradient
                    id="colorAverage"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop
                        offset="5%"
                        stopColor="#8884d8"
                        stopOpacity={0.8}
                    />
                    <stop
                        offset="95%"
                        stopColor="#8884d8"
                        stopOpacity={0}
                    />
                </linearGradient>
                <linearGradient
                    id="colorGamer"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop
                        offset="5%"
                        stopColor="#22c55e"
                        stopOpacity={0.8}
                    />
                    <stop
                        offset="95%"
                        stopColor="#22c55e"
                        stopOpacity={0}
                    />
                </linearGradient>
            </defs>
            <CartesianGrid
                stroke="#22223b"
                strokeDasharray="5 5"
                horizontal={false}
            />
            <XAxis
                dataKey="reactionTime"
                ticks={[
                    0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300,
                    325, 350, 375, 400, 425, 450, 475, 500,
                ]}
                tickFormatter={(value) => `${value}ms`}
                label={{
                    value: "Reaction Time (ms)",
                    position: "insideBottom",
                    offset: -5,
                }}
            />
            <YAxis width="auto" />
            <Tooltip content={<CustomTooltip />} />
            <Area
                type="basis"
                dataKey="average"
                name="average"
                stroke="#8884d8"
                strokeWidth={2}
                fill="url(#colorAverage)"
                dot={false}
            />
            <Area
                type="basis"
                dataKey="gamer"
                name="gamer"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#colorGamer)"
                dot={false}
            />
            <RechartsDevtools />
        </AreaChart>
    );
};

export default RLineChart;

import React from "react";
import { Line } from "react-chartjs-2";
import ChartWrapper from "../../components/ChartJsWrapper";
import { PricePoint } from "../../types/Backend";
import { group } from "console";

export default function PriceChart({ prices }: { prices: PricePoint[] }) {
    return <ChartWrapper>
        <Line
            options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                            round: 'day',
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }}
            data={{
                labels: prices.map(p => Date.parse(p.timestamp)),
                datasets: [{
                    label: 'Minimum Price',
                    data: prices.map(p => p.minPrice),
                }, {
                    label: 'Average Price (out of 3)',
                    data: prices.map(p => p.avgPrice),
                }]
            }}
            height={400}
        ></Line>
    </ChartWrapper>;
}
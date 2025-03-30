import React from "react";
import { Line } from "react-chartjs-2";
import ChartWrapper from "../../components/ChartJsWrapper";
import { group } from "console";
import { PriceMeasurement } from "../../types/Backend";

export default function PriceChart({ prices }: { prices: PriceMeasurement[] }) {
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
                    data: prices.map(p => p.minimum),
                }, {
                    label: 'Average Price (out of 3)',
                    data: prices.map(p => p.averageLastThreeSales),
                }]
            }}
            height={400}
        ></Line>
    </ChartWrapper>;
}
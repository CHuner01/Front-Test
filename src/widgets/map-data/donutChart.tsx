'use client'
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

type SmoothDonutChartType = {
    names: string[],
    values: number[],
}

function SmoothDonutChart({names, values}: SmoothDonutChartType) {
    const data = {
        labels: names,
        datasets: [
            {
                data: values,
                backgroundColor: ["#514A96", "#916626", "#006AFF", "#7AA987", "#DA6940", "#9DB0D3", "#1B1B1B"],
                borderWidth: 0,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false,
            },
        },
        cutout: "90%",
        animation: {
            duration: 0,
        },
        elements: {
            arc: {
                borderWidth: 0,
                borderRadius: 0
            },
        },
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default SmoothDonutChart;

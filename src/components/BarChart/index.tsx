import React from "react";

type BarChartProps = {
    title: string;
    value: number;
}

const BarChart = (props: BarChartProps) => {
    const { title, value } = { ...props }
    return <svg
        width="100%"
        height="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100">
        <text>{title}</text>
        <rect x="25" y="0" height={value * 100} width="10" fill="blue" />
    </svg>
}

export default BarChart
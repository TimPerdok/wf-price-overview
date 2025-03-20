import { Chart as ChartJS, registerables } from 'chart.js';
import React from 'react';
import { Chart } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns';
import theme from "../Theme";

ChartJS.register(...registerables);

// ChartJS.defaults.backgroundColor = '#9BD0F5';
// ChartJS.defaults.borderColor = '#36A2EB';
ChartJS.defaults.color = theme.palette.text.primary;
 

export default function ChartWrapper({ children }) {
    return <div>
        {children}
    </div>
}
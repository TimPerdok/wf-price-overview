import { Chart as ChartJS, registerables } from 'chart.js';
import React from 'react';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);
import 'chartjs-adapter-date-fns';

export default function ChartWrapper({ children }) {
    return <div>
        {children}
    </div>
}
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

import React, { useState } from 'react';

const options = [
    "Entre el 10 % más bajo",
    "Entre el tercio más bajo",
    "Normal",
    "Entre el tercio superior",
    "Entre el 10 % superior"
];

const values = [10, 33, 50, 66, 90];

// Definir un array de colores correspondientes a cada resultado
const colors = [
    'rgba(255, 0, 0, 0.5)',    // Color para "Entre el 10 % más bajo"
    'rgba(255, 165, 0, 0.5)', // Color para "Entre el tercio más bajo"
    'rgba(0, 128, 0, 0.5)',   // Color para "Normal"
    'rgba(0, 0, 128, 0.5)',   // Color para "Entre el tercio superior"
    'rgba(128, 0, 128, 0.5)'  // Color para "Entre el 10 % superior"
];

const misoptions = {
    responsive: true,
    animation: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            min: 0,
            max: 100
        }
    }
};

export default function Bars() {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(2); // Supongamos que "Normal" es la opción predeterminada.
    const selectedValue = values[selectedOptionIndex];

    const midata = {
        labels: options,
        datasets: [
            {
                label: 'Calificación',
                data: values,
                backgroundColor: colors, // Asigna los colores correspondientes a cada barra
            }
        ]
    };

    return (
        <div style={{ width: '500px', height: '550px', margin: '0 auto' }}>
            <div>
                <Bar data={midata} options={misoptions} />
            </div>
        </div>
    );
}

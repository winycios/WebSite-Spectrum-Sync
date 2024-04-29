import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Tableau10 = [
    '#4e79a7',
    '#f28e2c',
    '#e15759',
    '#76b7b2',
    '#59a14f',
    '#edc949',
    '#bab0ab'
];

const chartSetting = {
    margin: { right: 5 },
    xAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    height: 250,
};
const dataset = [
    {
        london: 59,
        paris: 57,
        newYork: 86,
        seoul: 21,
        month: 'Seg',
    },
    {
        london: 50,
        paris: 52,
        newYork: 78,
        seoul: 28,
        month: 'Ter',
    },
    {
        london: 47,
        paris: 53,
        newYork: 106,
        seoul: 41,
        month: 'Qua',
    },
    {
        london: 54,
        paris: 56,
        newYork: 92,
        seoul: 73,
        month: 'Qui',
    },
    {
        london: 57,
        paris: 69,
        newYork: 92,
        seoul: 99,
        month: 'Sex',
    },
    {
        london: 60,
        paris: 63,
        newYork: 103,
        seoul: 144,
        month: 'Sab',
    },
    {
        london: 59,
        paris: 60,
        newYork: 105,
        seoul: 319,
        month: 'Dom',
    },
];


const valueFormatter = (value) => value;

export default function BasicColor() {
    const [color, setColor] = React.useState('#4e79a7');

    const handleChange = (event, nextColor) => {
        setColor(nextColor);
    };

    return (
        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%', padding: "10px" }}>
            <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter, color }]}
                layout="horizontal"
                sx={{
                    '& tspan': {
                        fill: color, // set the fill color of tspans
                    },
                    '& .MuiChartsAxis-line': {
                        stroke: "white !important"
                    },
                    '& .MuiChartsAxis-tick': {
                        stroke: "white !important"
                    },
                }}
                {...chartSetting}

            />
            <ToggleButtonGroup
                value={color}
                exclusive
                onChange={handleChange}
            >
                {Tableau10.map((value) => (
                    <ToggleButton key={value} value={value} sx={{ p: 1 }}>
                        <div
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: value,
                                display: 'inline-block',
                            }}
                        />
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
}

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
            label: 'Quantidade',
        },
    ],
    height: 250,
};
const dataset = [
    {
        seoul: 8,
        month: 'Seg',
    },
    {
        seoul: 4,
        month: 'Ter',
    },
    {
        seoul: 2,
        month: 'Qua',
    },
    {
        seoul: 1,
        month: 'Qui',
    },
    {
        seoul: 0,
        month: 'Sex',
    },
    {
        seoul: 3,
        month: 'Sab',
    },
    {
        seoul: 1,
        month: 'Dom',
    },
];


const valueFormatter = (value) => value;

export default function BasicColor() {
    const [color, setColor] = React.useState('#e15759');

    const handleChange = (event, nextColor) => {
        setColor(nextColor);
    };

    return (
        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%', padding: "10px" }}>
            <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'seoul', label: 'Dias', valueFormatter, color }]}
                layout="horizontal"
                sx={{
                    '& tspan': {
                        fill: color,
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

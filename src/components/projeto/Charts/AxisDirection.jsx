import * as React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { BarPlot } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';

const dataset = [
    { min: -12, max: -4, precip: 79, month: 'Jan' },
    { min: -11, max: -3, precip: 66, month: 'Feb' },
    { min: -6, max: 2, precip: 76, month: 'Mar' },
    { min: 1, max: 9, precip: 106, month: 'Apr' },
];

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
    height: 250,
};

export default function ReverseExampleNoSnap() {
    const [color, setColor] = React.useState('#4e79a7');

    const handleChange = (event, nextColor) => {
        setColor(nextColor);
    };

    const series = [
        { type: 'bar', dataKey: 'precip', color, yAxisKey: 'rightAxis', label: 'Peso atual' },
        { type: 'line', dataKey: 'min', color: 'white', label: 'Peso ideal/objetivo' }
    ];

    return (
        <Stack spacing={2} alignItems="center" sx={{ width: '100%', padding: "10px" }}>
            <ResponsiveChartContainer
                series={series}
                xAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'month',
                        label: 'Month',
                    },
                ]}
                sx={{
                    '& tspan': {
                        fill: color,
                    },
                    '& .MuiChartsAxis-line': {
                        stroke: "white !important"
                    },
                    '& .MuiChartsAxis-tick': {
                        stroke: "white !important"
                    }
                }}
                yAxis={[
                    { id: 'leftAxis' },
                    { id: 'rightAxis', position: 'right' },
                ]}
                dataset={dataset}
                {...chartSetting}>
                <ChartsGrid horizontal />
                <BarPlot />
                <LinePlot />
                <MarkPlot />

                <ChartsXAxis />
                <ChartsYAxis label="temerature (°C)" />
                <ChartsTooltip backgroundColor="black" />
            </ResponsiveChartContainer>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {series.map((s, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: s.color, marginRight: '5px' }}></div>
                        <span>{s.label}</span>
                    </div>
                ))}
            </div>
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

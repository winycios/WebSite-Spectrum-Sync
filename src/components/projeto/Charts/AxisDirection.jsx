import React, { useEffect, useState } from 'react';
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

import Api from '../../../api';
import { getId } from '../../../service/auth';


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
    margin: { right: 0 },
    height: 250,
};

export default function ReverseExampleNoSnap() {

    const [loading, setLoading] = useState(true);


    const [dataset, setDataset] = useState([{
        dataPostagem: '',
        peso: '',
        pesoMeta: ''
    }])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`pesos/historico-grafico/${getId()}`);
                const userData = response.data;
                setDataset(userData.map(item => ({
                    dataPostagem: formatDate(item.dataPostagem),
                    peso: item.peso,
                    pesoMeta: item.pesoMeta
                })).reverse());
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [color, setColor] = React.useState('#59a14f');

    const handleChange = (event, nextColor) => {
        setColor(nextColor);
    };

    const series = [
        { type: 'bar', dataKey: 'peso', color, yAxisKey: 'leftAxis', label: 'Peso' },
        { type: 'line', dataKey: 'pesoMeta', color: 'white', label: 'Meta de peso' }
    ];


    return (
        <Stack spacing={2} alignItems="center" sx={{ width: '100%', padding: "10px" }}>
            {loading ? (
                <div>Carregando...</div>
            ) : (
                <React.Fragment>
                    <ResponsiveChartContainer
                        series={series}
                        xAxis={[
                            {
                                scaleType: 'band',
                                dataKey: 'dataPostagem',
                                label: 'Data',
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
                            { id: 'rightAxis' },
                        ]}
                        dataset={dataset}
                        {...chartSetting}>
                        <ChartsGrid horizontal />
                        <BarPlot />
                        <LinePlot />
                        <MarkPlot />

                        <ChartsXAxis />
                        <ChartsYAxis label="Peso (KG)" />
                        <ChartsYAxis />

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
                </React.Fragment>
            )}
        </Stack>
    );
}

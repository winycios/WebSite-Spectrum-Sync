import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Api from '../../../api';
import { getId } from '../../../service/auth';

// Cores padrão da paleta Tableau10
const Tableau10 = [
    '#4e79a7',
    '#f28e2c',
    '#e15759',
    '#76b7b2',
    '#59a14f',
    '#edc949',
    '#bab0ab'
];

// Configurações padrão do gráfico
const chartSettings = {
    margin: { right: 5 },
    xAxis: [
        {
            label: 'Quantidade',
        },
    ],
    height: 250,
};

const valueFormatter = (value) => value;

export default function BasicColor() {
    const [selectedColor, setSelectedColor] = useState('#e15759');
    const [data, setData] = useState([]);

    const handleColorChange = (event, newColor) => {
        setSelectedColor(newColor);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`treinos/por-dia-da-semana/${getId()}`);
                const userData = response.data.map(({ diaDaSemana, quantidadeTreinos }) => ({
                    diaDaSemana,
                    quantidadeTreinos,
                })).reverse();
                setData(userData);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%', padding: "10px" }}>
            <BarChart
                dataset={data}
                yAxis={[{ scaleType: 'band', dataKey: 'diaDaSemana' }]}
                series={[{ dataKey: 'quantidadeTreinos', label: 'Dias', valueFormatter, color: selectedColor }]}
                layout="horizontal"
                sx={{
                    '& tspan': {
                        fill: selectedColor,
                    },
                    '& .MuiChartsAxis-line': {
                        stroke: "white !important"
                    },
                    '& .MuiChartsAxis-tick': {
                        stroke: "white !important"
                    },
                }}
                {...chartSettings}
            />
            <ToggleButtonGroup
                value={selectedColor}
                exclusive
                onChange={handleColorChange}
            >
                {Tableau10.map((color) => (
                    <ToggleButton key={color} value={color} sx={{ p: 1 }}>
                        <div
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: color,
                                display: 'inline-block',
                            }}
                        />
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
}

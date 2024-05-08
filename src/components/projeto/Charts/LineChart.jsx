import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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

const chartsParams = {
    margin: { bottom: 25, right: 5 },
    yAxis: [
        {
            label: 'Quilogramas',
        },
    ],
    height: 260,
};
export default function BasicColor() {
    const [color, setColor] = React.useState('#4e79a7');

    const [loading, setLoading] = useState(true);


    const [dataset, setDataset] = useState([{
        dataPostagem: '',
        peso: '',
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
                    peso: item.peso
                })));
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleChange = (event, nextColor) => {
        setColor(nextColor);
    };

    return (
        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%', padding: '10px' }}>
            {loading ? (
                <div>Carregando...</div>
            ) : (
                <React.Fragment>
                    <LineChart
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
                        xAxis={[{ scaleType: 'point', data: dataset.map(item => item.dataPostagem) }]}
                        {...chartsParams}
                        series={[
                            {
                                data: dataset.map(item => item.peso),
                                label: 'Peso (KG)',
                                color,
                            },
                        ]}
                    />
                    {console.log(dataset.map(item => item.dataPostagem))}
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

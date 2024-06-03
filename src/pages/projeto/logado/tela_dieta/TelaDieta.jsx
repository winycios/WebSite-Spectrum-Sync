import React, { useState, useEffect } from "react";
import styles from "./TelaDieta.module.css";
import NavBar from "../../../../components/projeto/navBar/NavBar";
import FindUser from "../../../../components/projeto/GET/ValidarUsuario";
import CardDieta from "../../../../components/projeto/card_dieta/CardDieta";

import Api from "../../../../api";
import { getId } from "../../../../service/auth";
import moment from "moment";

import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";

const TelaDieta = () => {
  const [loading, setLoading] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [currentPeso, setCurrentPeso] = useState(null);
  const [nutrientTotals, setNutrientTotals] = useState({
    carboidratos: 0,
    calorias: 0,
    gorduras: 0,
    proteinas: 0,
  });
  const [currentNutrientTotals, setCurrentNutrientTotals] = useState({
    carboidratos: 0,
    calorias: 0,
    gorduras: 0,
    proteinas: 0,
  });

  const formatDate = (dateString) => {
    const date = moment(dateString);
    return date.format("DD/MM");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`pesos/historico-grafico/${getId()}`);
        const userData = response.data;
        setDataset(
          userData.reverse().map((item) => ({
            dataPostagem: item.dataPostagem,
            peso: item.peso,
          }))
        );
        if (userData.length > 0) {
          setCurrentPeso(userData[0].peso);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const storedTotalNutrients = sessionStorage.getItem("totalNutrients");
    const storedCurrentNutrients = sessionStorage.getItem(
      "currentNutrientTotals"
    );

    if (storedTotalNutrients) {
      setNutrientTotals(JSON.parse(storedTotalNutrients));
    }

    if (storedCurrentNutrients) {
      setCurrentNutrientTotals(JSON.parse(storedCurrentNutrients));
    }
  }, []);

  return (
    <>
      <NavBar />
      <FindUser />
      <div className={styles.main}>
        <div className={styles.sub_main}>
          <h1 className={styles.h1}>Suas Refeições de Hoje:</h1>
          <CardDieta
            onNutrientTotalsUpdate={setNutrientTotals}
            onCurrentNutrientUpdate={setCurrentNutrientTotals}
          />
          <div className={styles.dashboardContainer}>
            <div className={styles.box_KPI}>
              <div className={styles.title_box_KPI}>
                <h1 className={styles.title_KPI}>Sua Atividade Hoje:</h1>
              </div>

              <div className={styles.info_box_KPI}>
                <div className={styles.info_KPI}>
                  <h2 className={styles.title_info}>Calorias</h2>
                  <h2 className={styles.title_info}>
                    <span className={styles.sub_title_info}>
                      {currentNutrientTotals.calorias}
                    </span>
                    /{nutrientTotals.calorias}kcal
                  </h2>
                  <h2 className={styles.title_info}>Proteínas</h2>
                  <h2 className={styles.title_info}>
                    <span className={styles.sub_title_info}>
                      {currentNutrientTotals.proteinas}
                    </span>
                    /{nutrientTotals.proteinas}g
                  </h2>
                  <h2 className={styles.title_info}>Carboidratos</h2>
                  <h2 className={styles.title_info}>
                    <span className={styles.sub_title_info}>
                      {currentNutrientTotals.carboidratos}
                    </span>
                    /{nutrientTotals.carboidratos}g
                  </h2>
                  <h2 className={styles.title_info}>Gorduras</h2>
                  <h2 className={styles.title_info}>
                    <span className={styles.sub_title_info}>
                      {currentNutrientTotals.gorduras}
                    </span>
                    /{nutrientTotals.gorduras}g
                  </h2>
                </div>

                <PieChart
                  sx={{
                    "& &&& .MuiChartsLegend-label": {
                      fill: "white !important",
                    },
                    "& &&& .MuiChartsLegend-label:hover": {
                      fill: "white !important",
                    },
                    "& .css-1mhcdve-MuiPieArc-root": {
                      stroke: "none",
                    },
                    "& .css-pzk9ne-MuiChartsSurface-root": {
                      color: "white",
                    },
                    "& tspan": {
                      fill: "white",
                    },
                    "& .MuiChartsAxis-line": {
                      stroke: "white !important",
                    },
                    "& .MuiChartsAxis-tick": {
                      stroke: "white !important",
                    },
                  }}
                  colors={["red", "white"]}
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: currentNutrientTotals.calorias,
                          label: "Consumido",
                          color: "red",
                        },
                        {
                          id: 1,
                          value:
                            nutrientTotals.calorias -
                            currentNutrientTotals.calorias,
                          label: "Total",
                          color: "white",
                        },
                      ],
                      innerRadius: 90,
                      outerRadius: 100,
                      paddingAngle: 0,
                      cornerRadius: 0,
                      startAngle: 0,
                      endAngle: 360,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </div>
            </div>

            <div className={styles.box_KPI}>
              <div className={styles.title_box_KPI}>
                <h1 className={styles.title_KPI}>Seu Peso Recente:</h1>
              </div>

              <LineChart
                sx={{
                  "& tspan": {
                    fill: 'white',
                  },
                  "& .MuiChartsAxis-line": {
                    stroke: "white !important",
                  },
                  "& .MuiChartsAxis-tick": {
                    stroke: "white !important",
                  },
                }}
                xAxis={[
                  {
                    data: dataset.map((item) => formatDate(item.dataPostagem)),
                    scaleType: "point",
                    label: "Data",
                  },
                ]}
                series={[
                  {
                    data: dataset.map((item) => item.peso),
                    label: "Peso",
                  },
                ]}
                width={600}
                height={300}
              />
              {currentPeso && <p>Peso Atual: {currentPeso} kg</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TelaDieta;

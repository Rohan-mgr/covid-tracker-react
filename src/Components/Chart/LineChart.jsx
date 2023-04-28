import { useState, useEffect } from "react";
import "../../assets/css/LineChart.css";
import axios from "../../config";
import { getChartData } from "../../utils/getChartData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Line Graph for different Countries",
    },
  },
};

function Chart({ SelectedCountry }) {
  const [filter, setFilter] = useState("infected");
  const [chartData, setChartData] = useState({
    infected: null,
    recovered: null,
    deaths: null,
  });
  useEffect(() => {
    axios
      .get(
        `https://disease.sh/v3/covid-19/historical/${SelectedCountry}?lastdays=20`
      )
      .then((res) => {
        setChartData((prevState) => {
          return {
            ...prevState,
            infected:
              SelectedCountry === "all"
                ? res.data.cases
                : res.data.timeline.cases,
            recovered:
              SelectedCountry === "all"
                ? res.data.recovered
                : res.data.timeline.recovered,
            deaths:
              SelectedCountry === "all"
                ? res.data.deaths
                : res.data.timeline.deaths,
          };
        });
      })
      .catch((err) => console.log(err));
  }, [SelectedCountry]);

  const data = {
    labels: chartData.infected && Object.keys(chartData.infected),
    datasets: [
      {
        label:
          filter === "infected"
            ? "Infected"
            : filter === "deaths"
            ? "Deaths"
            : "Recovered",
        data: getChartData(chartData, filter),
        borderColor:
          filter === "infected"
            ? "#f5dd42"
            : filter === "deaths"
            ? "red"
            : "green",
        backgroundColor:
          filter === "infected"
            ? "rgba(245,221,66, 0.2)"
            : filter === "deaths"
            ? "rgba(255,0,0,0.2)"
            : "rgba(0,128,0, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="chart__wrapper">
      <div className="btn__wrapper">
        <button
          style={{
            background: "rgba(245,221,66, 0.8)",
            transform: `${filter === "infected" ? "scale(1.3" : "scale(1)"}`,
          }}
          onClick={() => setFilter("infected")}
        >
          Infected
        </button>
        <button
          style={{ background: "rgba(0,128,0, 0.8)" }}
          onClick={() => setFilter("recovered")}
        >
          Recovered
        </button>
        <button
          style={{ background: "rgba(255,0,0,0.8)" }}
          onClick={() => setFilter("deaths")}
        >
          Deaths
        </button>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}

export default Chart;

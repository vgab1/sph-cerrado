import { useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

type TimeSeriesData = {
  date: string;
  precipitation_sum: number;
  soil_moisture: number;
};

type ReportData = {
  timeSeries: TimeSeriesData[];
};

type ForecastProps = {
  reportData: ReportData;
};

export default function Futuro({ reportData }: ForecastProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartVisible, setChartVisible] = useState(false);
  let forecastChartInstance: Chart | null = null;

  const runForecastSimulation = (scenario: "dry" | "normal" | "wet") => {
    setChartVisible(true); // Mostrar gráfico ao clicar

    if (!chartRef.current) return;
    const summaryElement = document.getElementById("simulationSummary");
    if (!summaryElement) return;

    // --- lógica da simulação ---
    const historicalMoisture = reportData.timeSeries.map(
      (d) => d.soil_moisture
    );
    const sortedMoisture = [...historicalMoisture].sort((a, b) => a - b);
    const p10 = sortedMoisture[Math.floor(sortedMoisture.length * 0.1)];
    const p20 = sortedMoisture[Math.floor(sortedMoisture.length * 0.2)];
    const p30 = sortedMoisture[Math.floor(sortedMoisture.length * 0.3)];

    const monthlyPrecipAvg = Array.from({ length: 12 }, (_, month) => {
      const monthData = reportData.timeSeries.filter(
        (d) => new Date(d.date).getMonth() === month
      );
      return (
        monthData.reduce((sum, d) => sum + (d.precipitation_sum || 0), 0) /
        (monthData.length || 1)
      );
    });

    let precipScenario = [...monthlyPrecipAvg];
    if (scenario === "dry")
      precipScenario = monthlyPrecipAvg.map((p) => p * 0.7);
    else if (scenario === "wet")
      precipScenario = monthlyPrecipAvg.map((p) => p * 1.3);

    let lastMoisture =
      reportData.timeSeries[reportData.timeSeries.length - 1].soil_moisture;
    const forecast: number[] = [];
    const forecastLabels: string[] = [];
    const startDate = new Date(
      reportData.timeSeries[reportData.timeSeries.length - 1].date
    );
    const alertCounts = { attention: 0, alert: 0, emergency: 0 };

    for (let i = 1; i <= 36; i++) {
      const currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + i);
      const month = currentDate.getMonth();
      const precip = precipScenario[month];

      let nextMoisture = lastMoisture * 0.5 + precip * 0.0005 + 0.1;
      nextMoisture = Math.max(0.15, Math.min(nextMoisture, 0.42));

      forecast.push(nextMoisture);
      forecastLabels.push(
        currentDate.toLocaleDateString("pt-BR", {
          month: "short",
          year: "numeric",
        })
      );
      lastMoisture = nextMoisture;

      if (nextMoisture < p10) alertCounts.emergency++;
      else if (nextMoisture < p20) alertCounts.alert++;
      else if (nextMoisture < p30) alertCounts.attention++;
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (forecastChartInstance) forecastChartInstance.destroy();

    forecastChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: forecastLabels,
        datasets: [
          {
            label: "Umidade do Solo Prevista",
            data: forecast,
            borderColor: "#A0522D",
            backgroundColor: "rgba(160, 82, 45, 0.1)",
            borderWidth: 2,
            pointRadius: 1,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: { display: true, text: "Umidade do Solo (m³/m³)" },
            min: 0.1,
            max: 0.45,
          },
        },
        plugins: { legend: { display: false } },
      },
    });

    summaryElement.innerHTML = `No <span class="font-bold">${
      scenario === "dry"
        ? "Cenário Seco"
        : scenario === "wet"
        ? "Cenário Chuvoso"
        : "Cenário Normal"
    }</span>, o sistema entraria em estado de 
      <span class="text-yellow-600 font-bold">Atenção por ${
        alertCounts.attention
      } meses</span>, 
      <span class="text-orange-600 font-bold">Alerta por ${
        alertCounts.alert
      } meses</span> e 
      <span class="text-red-600 font-bold">Emergência por ${
        alertCounts.emergency
      } meses</span> ao longo dos próximos 3 anos.`;
  };

  return (
    <section
      id="previsao"
      className="min-h-screen flex flex-col justify-center px-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        Navegando o Futuro da Água
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-10">
        O SPH Cerrado não apenas monitora o presente, mas nos ajuda a escolher
        um futuro melhor. Usando o conceito do "Cone de Futuros", podemos
        simular cenários e tomar decisões para alcançar um futuro mais seguro e
        resiliente. Escolha um cenário climático e veja uma simulação para os
        próximos 3 anos.
      </p>

      <div className="section-card rounded-lg p-6 md:p-8 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={() => runForecastSimulation("dry")}
            className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors w-full md:w-auto cursor-pointer"
          >
            Cenário Seco
          </button>
          <button
            onClick={() => runForecastSimulation("normal")}
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto cursor-pointer"
          >
            Cenário Normal
          </button>
          <button
            onClick={() => runForecastSimulation("wet")}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors w-full md:w-auto cursor-pointer"
          >
            Cenário Chuvoso
          </button>
        </div>

        {chartVisible && (
          <div
            className="chart-container"
            style={{ height: "320px", maxHeight: "50vh" }}
          >
            <canvas ref={chartRef}></canvas>
          </div>
        )}

        <div id="simulationSummary" className="mt-4 text-center font-semibold">
          {!chartVisible && (
            <p>Selecione um cenário para iniciar a simulação.</p>
          )}
        </div>
      </div>
    </section>
  );
}

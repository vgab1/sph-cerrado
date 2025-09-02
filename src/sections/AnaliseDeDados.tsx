import { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  BarController,
  LineController,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  BarController,
  LineController
);

type TimeSeriesData = {
  date: string;
  precipitation_sum: number;
  NDVI: number;
};

type ReportData = {
  timeSeries: TimeSeriesData[];
};

type AnaliseDeDadosProps = {
  reportData: ReportData;
};

export default function Analise({ reportData }: AnaliseDeDadosProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !reportData?.timeSeries) return;

    const labels = reportData.timeSeries.map((d) =>
      new Date(d.date).toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      })
    );

    const data = {
      labels,
      datasets: [
        {
          label: "Precipitação (mm)",
          data: reportData.timeSeries.map((d) => d.precipitation_sum),
          backgroundColor: "#2981F6",
          borderColor: "#2981F6",
          yAxisID: "y",
          order: 2,
        },
        {
          label: "NDVI (Saúde da Vegetação)",
          data: reportData.timeSeries.map((d) => d.NDVI),
          borderColor: "#8FBC8F",
          borderWidth: 3,
          yAxisID: "y1",
          type: "line" as const,
          tension: 0.4,
          fill: false,
          order: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        tooltip: { enabled: true, mode: "index", intersect: false },
        legend: { position: "top" },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: { display: true, text: "Precipitação (mm)", color: "#2981F6" },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: { display: true, text: "NDVI", color: "#8FBC8F" },
          grid: { drawOnChartArea: false },
        },
      },
    };

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartInstance = new Chart(ctx, {
      type: "bar",
      data,
      options,
    });

    return () => {
      chartInstance.destroy();
    };
  }, [reportData]);

  return (
    <section
      id="analise"
      className="min-h-screen flex flex-col justify-center px-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        Entendendo o Pulso do Cerrado
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-10">
        A análise de uma década de dados de satélite revela a forte sazonalidade
        do bioma e uma descoberta crucial: a vegetação não responde à chuva
        imediatamente. Existe uma defasagem, uma janela de tempo valiosa para a
        previsão. Passe o mouse sobre o gráfico para explorar os dados.
      </p>
      <div className="section-card rounded-lg p-6">
        <div
          className="chart-container mx-auto shadow-lg border border-gray-200 bg-white rounded-lg"
          style={{ maxWidth: "900px", height: "400px" }}
        >
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </section>
  );
}

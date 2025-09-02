import { useEffect, useRef } from "react";
import {
  Chart,
  DoughnutController,
  BarController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(
  DoughnutController,
  BarController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

type ReportData = {
  modelPerformance: {
    r2_test: number;
  };
  featureImportance: Record<string, number>;
};

type ModeloPreditivoProps = {
  reportData: ReportData;
};

export default function Modelo({ reportData }: ModeloPreditivoProps) {
  const accuracyRef = useRef<HTMLCanvasElement | null>(null);
  const featureRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!accuracyRef.current || !featureRef.current) return;

    const accuracyChart = new Chart(accuracyRef.current.getContext("2d")!, {
      type: "doughnut",
      data: {
        labels: ["Variação Explicada pelo Modelo", "Não Explicada"],
        datasets: [
          {
            data: [
              reportData.modelPerformance.r2_test * 100,
              (1 - reportData.modelPerformance.r2_test) * 100,
            ],
            backgroundColor: ["#A0522D", "#EAEAEA"],
            borderColor: ["#FFFFFF"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: `R² = ${reportData.modelPerformance.r2_test.toFixed(2)}`,
            font: { size: 24, weight: "bold" },
            color: "#A0522D",
          },
        },
      },
    });

    const sortedFeatures = Object.entries(reportData.featureImportance).sort(
      ([, a], [, b]) => b - a
    );
    const featureColors: Record<string, string> = {
      Evapotranspiração: "#BDFF00",
      MNDWI: "#21018B",
      NDVI: "#06C664",
      "Temperatura do Ar": "#FF0000",
      Precipitação: "#2981F6",
    };
    const backgroundColors = sortedFeatures.map(
      (f) => featureColors[f[0]] || "#cccccc"
    );

    const featureChart = new Chart(featureRef.current.getContext("2d")!, {
      type: "bar",
      data: {
        labels: sortedFeatures.map((f) => f[0]),
        datasets: [
          {
            label: "Importância Relativa",
            data: sortedFeatures.map((f) => f[1]),
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            beginAtZero: true,
            title: { display: true, text: "Score de Importância" },
          },
        },
      },
    });

    return () => {
      accuracyChart.destroy();
      featureChart.destroy();
    };
  }, [reportData]);

  return (
    <section
      id="modelo"
      className="min-h-screen flex flex-col justify-center px-6"
    >
      <h2 className="text-3xl font-bold text-center mb-10">
        O Coração do Sistema: O Modelo Preditivo
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-1 section-card rounded-lg p-6 text-center bg-white">
          <h3 className="font-bold text-lg mb-2">Performance do Modelo</h3>
          <p className="text-sm text-gray-600 mb-4">
            O modelo Random Forest consegue explicar a maior parte da variação
            da umidade do solo.
          </p>
          <div
            className="chart-container"
            style={{ height: "200px", maxHeight: "200px" }}
          >
            <canvas ref={accuracyRef}></canvas>
          </div>
        </div>
        <div className="lg:col-span-2 section-card rounded-lg p-6 bg-white">
          <h3 className="font-bold text-lg mb-2 text-center">
            O Que o Modelo Aprendeu?
          </h3>
          <p className="text-center text-sm text-gray-600 mb-4">
            A análise revela que a perda de água (Evapotranspiração) e a
            presença de água na paisagem (MNDWI) são indicadores mais poderosos
            para prever a seca do que a própria Precipitação.
          </p>
          <div
            className="chart-container"
            style={{ height: "280px", maxHeight: "280px" }}
          >
            <canvas ref={featureRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

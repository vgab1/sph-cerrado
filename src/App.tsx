import Header from "./components/Header";
import Alert from "./sections/Alert";
import Analise from "./sections/AnaliseDeDados";
import Futuro from "./sections/Futuro";
import Hero from "./sections/Hero";
import Modelo from "./sections/ModeloPreditivo";
import Solution from "./sections/Solution";

export default function App() {
  const mockReportData = {
    timeSeries: [
      {
        date: "2023-01-01",
        precipitation_sum: 120,
        NDVI: 0.65,
        soil_moisture: 0.3,
      },
      {
        date: "2023-02-01",
        precipitation_sum: 90,
        NDVI: 0.68,
        soil_moisture: 0.32,
      },
      {
        date: "2023-03-01",
        precipitation_sum: 60,
        NDVI: 0.7,
        soil_moisture: 0.28,
      },
      {
        date: "2023-04-01",
        precipitation_sum: 30,
        NDVI: 0.72,
        soil_moisture: 0.25,
      },
      {
        date: "2023-05-01",
        precipitation_sum: 50,
        NDVI: 0.75,
        soil_moisture: 0.27,
      },
      {
        date: "2023-06-01",
        precipitation_sum: 80,
        NDVI: 0.73,
        soil_moisture: 0.29,
      },
      {
        date: "2023-07-01",
        precipitation_sum: 100,
        NDVI: 0.7,
        soil_moisture: 0.31,
      },
      {
        date: "2023-08-01",
        precipitation_sum: 110,
        NDVI: 0.68,
        soil_moisture: 0.33,
      },
      {
        date: "2023-09-01",
        precipitation_sum: 90,
        NDVI: 0.66,
        soil_moisture: 0.3,
      },
      {
        date: "2023-10-01",
        precipitation_sum: 70,
        NDVI: 0.65,
        soil_moisture: 0.28,
      },
      {
        date: "2023-11-01",
        precipitation_sum: 50,
        NDVI: 0.64,
        soil_moisture: 0.27,
      },
      {
        date: "2023-12-01",
        precipitation_sum: 40,
        NDVI: 0.63,
        soil_moisture: 0.26,
      },
    ],
  };

  const mockModeloData = {
    modelPerformance: {
      r2_test: 0.79,
    },
    featureImportance: {
      Evapotranspiração: 0.412,
      MNDWI: 0.317,
      NDVI: 0.15,
      "Temperatura do Ar": 0.067,
      Precipitação: 0.038,
    },
  };

  return (
    <>
      <Header />
      <main className="bg-yellow-50">
        <section id="problema" className="pt-20">
          <Hero />
        </section>
        <section id="solucao">
          <Solution />
        </section>
        <section id="analise">
          <Analise reportData={mockReportData} />
        </section>
        <section id="modelo">
          <Modelo reportData={mockModeloData} />
        </section>
        <section id="previsao">
          <Futuro reportData={mockReportData} />
        </section>
        <section id="alertas">
          <Alert />
        </section>
      </main>
    </>
  );
}

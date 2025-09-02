import Footer from "./components/Footer";
import Header from "./components/Header";
import Alert from "./sections/Alert";
import Analise from "./sections/AnaliseDeDados";
import Ciencia from "./sections/Ciencia";
import Futuro from "./sections/Futuro";
import Hero from "./sections/Hero";
import Modelo from "./sections/ModeloPreditivo";
import Quiz from "./sections/Quiz";
import Solution from "./sections/Solution";

export default function App() {
  const mockReportData = {
    timeSeries: [
      {
        date: "2020-01-01",
        precipitation_sum: 320.1,
        NDVI: 0.66,
        soil_moisture: 0.38,
      },
      {
        date: "2020-02-01",
        precipitation_sum: 240.2,
        NDVI: 0.63,
        soil_moisture: 0.36,
      },
      {
        date: "2020-03-01",
        precipitation_sum: 205.4,
        NDVI: 0.59,
        soil_moisture: 0.34,
      },
      {
        date: "2020-04-01",
        precipitation_sum: 115.9,
        NDVI: 0.55,
        soil_moisture: 0.31,
      },
      {
        date: "2020-05-01",
        precipitation_sum: 30.1,
        NDVI: 0.49,
        soil_moisture: 0.27,
      },
      {
        date: "2020-06-01",
        precipitation_sum: 4.5,
        NDVI: 0.43,
        soil_moisture: 0.25,
      },
      {
        date: "2020-07-01",
        precipitation_sum: 1.2,
        NDVI: 0.38,
        soil_moisture: 0.23,
      },
      {
        date: "2020-08-01",
        precipitation_sum: 15.6,
        NDVI: 0.35,
        soil_moisture: 0.22,
      },
      {
        date: "2020-09-01",
        precipitation_sum: 50.3,
        NDVI: 0.36,
        soil_moisture: 0.24,
      },
      {
        date: "2020-10-01",
        precipitation_sum: 160.7,
        NDVI: 0.49,
        soil_moisture: 0.3,
      },
      {
        date: "2020-11-01",
        precipitation_sum: 225.4,
        NDVI: 0.61,
        soil_moisture: 0.35,
      },
      {
        date: "2020-12-01",
        precipitation_sum: 285.9,
        NDVI: 0.64,
        soil_moisture: 0.37,
      },
      {
        date: "2021-01-01",
        precipitation_sum: 330.2,
        NDVI: 0.67,
        soil_moisture: 0.39,
      },
      {
        date: "2021-02-01",
        precipitation_sum: 250.8,
        NDVI: 0.64,
        soil_moisture: 0.37,
      },
      {
        date: "2021-03-01",
        precipitation_sum: 215.1,
        NDVI: 0.6,
        soil_moisture: 0.35,
      },
      {
        date: "2021-04-01",
        precipitation_sum: 120.4,
        NDVI: 0.56,
        soil_moisture: 0.32,
      },
      {
        date: "2021-05-01",
        precipitation_sum: 35.2,
        NDVI: 0.5,
        soil_moisture: 0.28,
      },
      {
        date: "2021-06-01",
        precipitation_sum: 5.8,
        NDVI: 0.44,
        soil_moisture: 0.26,
      },
      {
        date: "2021-07-01",
        precipitation_sum: 1.8,
        NDVI: 0.39,
        soil_moisture: 0.24,
      },
      {
        date: "2021-08-01",
        precipitation_sum: 18.2,
        NDVI: 0.36,
        soil_moisture: 0.23,
      },
      {
        date: "2021-09-01",
        precipitation_sum: 55.9,
        NDVI: 0.37,
        soil_moisture: 0.25,
      },
      {
        date: "2021-10-01",
        precipitation_sum: 170.3,
        NDVI: 0.5,
        soil_moisture: 0.31,
      },
      {
        date: "2021-11-01",
        precipitation_sum: 235.1,
        NDVI: 0.62,
        soil_moisture: 0.36,
      },
      {
        date: "2021-12-01",
        precipitation_sum: 295.6,
        NDVI: 0.65,
        soil_moisture: 0.38,
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
        <section>
          <Ciencia />
        </section>
        <section>
          <Quiz />
        </section>
      </main>
      <Footer />
    </>
  );
}

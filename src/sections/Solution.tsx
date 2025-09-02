export default function Solution() {
  return (
    <section id="solucao" className="min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-center mb-4">
        Uma Nova Abordagem: Da Reação à Previsão
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-12">
        Para evitar futuras crises, o projeto SPH Cerrado propõe uma mudança de
        paradigma, integrando tecnologia de ponta e participação comunitária
        para antecipar os riscos.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center font-semibold text-sm">
        <div className="p-4 section-card rounded-lg w-full md:w-48 h-32 flex flex-col justify-center bg-white shadow-md">
          🛰️
          <br />
          Monitoramento Remoto
          <span className="text-xs font-normal text-gray-500">
            Dados de Satélite (GEE)
          </span>
        </div>
        <div className="text-2xl text-gray-400 font-sans transform md:-rotate-0 rotate-90">
          →
        </div>
        <div className="p-4 section-card rounded-lg w-full md:w-48 h-32 flex flex-col justify-center bg-white shadow-md">
          🧠
          <br />
          Modelagem Preditiva
          <span className="text-xs font-normal text-gray-500">
            Machine Learning
          </span>
        </div>

        <div className="text-2xl text-gray-400 font-sans transform md:-rotate-0 rotate-90">
          →
        </div>
        <div className="p-4 section-card rounded-lg w-full md:w-48 h-32 flex flex-col justify-center bg-white shadow-md">
          📊
          <br />
          Sistema de Alertas
          <span className="text-xs font-normal text-gray-500">
            Baseado em Percentis
          </span>
        </div>

        <div className="text-2xl text-gray-400 font-sans transform md:-rotate-0 rotate-90">
          →
        </div>
        <div className="p-4 section-card rounded-lg w-full md:w-48 h-32 flex flex-col justify-center bg-white shadow-md">
          👥
          <br />
          Ciência Cidadã
          <span className="text-xs font-normal text-gray-500">
            App Mangaba Cerrado
          </span>
        </div>
      </div>
    </section>
  );
}

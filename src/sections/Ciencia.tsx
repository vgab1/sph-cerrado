import { useState } from "react";

export default function Ciencia() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <section
      id="ciencia"
      className="min-h-screen flex flex-col justify-center px-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        Ciência Cidadã em Ação
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-6">
        A tecnologia sozinha não é suficiente. A participação da comunidade é a
        peça-chave. Através do aplicativo{" "}
        <span className="font-semibold">Mangaba Cerrado</span>, qualquer pessoa
        pode se tornar um "sentinela hídrico", enviando dados locais que ajudam
        a validar e aprimorar as previsões do modelo. Simule sua contribuição
        abaixo.
      </p>
      <div className="section-card rounded-lg p-6 md:p-8 max-w-2xl mx-auto w-full">
        {submitted ? (
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-6xl mb-4">💧</p>
            <h3 className="font-bold text-gray-800 text-2xl">
              Obrigado pela sua contribuição!
            </h3>
            <p className="text-md text-gray-600 mt-2">
              Seus dados ajudam a proteger as águas do Cerrado. Juntos, somos
              mais fortes.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-800 cursor-pointer"
            >
              Enviar Nova Observação
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 rounded-lg shadow-md"
          >
            <div>
              <label
                htmlFor="rain"
                className="block text-sm font-medium text-gray-700"
              >
                Chuva nas últimas 24h (mm)
              </label>
              <input
                type="number"
                id="rain"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A0522D] focus:border-[#A0522D]"
                placeholder="Medido no seu pluviômetro"
                required
              />
            </div>
            <div>
              <label
                htmlFor="observation"
                className="block text-sm font-medium text-gray-700"
              >
                Nível do Córrego/Nascente Próximo
              </label>
              <select
                id="observation"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A0522D] focus:border-[#A0522D]"
                required
              >
                <option>Normal para a época</option>
                <option>Um pouco abaixo do normal</option>
                <option>Muito baixo</option>
                <option>Completamente seco</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#A0522D] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#804224] transition-colors cursor-pointer"
            >
              Enviar Observação
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

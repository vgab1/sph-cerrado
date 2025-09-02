export default function Hero() {
  return (
    <section id="problema" className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
        A Crise Hídrica Anunciada
      </h2>
      <p className="mt-6 text-lg text-gray-600 leading-relaxed">
        Em 2017, o Distrito Federal enfrentou um racionamento severo de água.
        Mas a crise não foi uma surpresa. Anos antes, os sinais já eram claros.
      </p>

      <div className="mt-10 p-6 w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <p className="text-6xl sm:text-7xl font-extrabold text-amber-800 mb-3">
          96,9%
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-bold text-gray-900">
            da capacidade de fornecimento
          </span>{" "}
          já era atingida em dias de pico em 2010, segundo o TCDF, sete anos
          antes da crise se materializar.
        </p>
      </div>
    </section>
  );
}

export default function Alert() {
  const alertData = [
    {
      icon: "✅",
      title: "Normal",
      border: "border-b-4 border-green-400",
      text: "text-green-700",
      description: "Condições de umidade adequadas para a época.",
    },
    {
      icon: "⚠️",
      title: "Atenção",
      border: "border-b-4 border-yellow-400",
      text: "text-yellow-700",
      description: "Solos mais secos que o normal. Risco de estresse hídrico.",
    },
    {
      icon: "🔥",
      title: "Alerta",
      border: "border-b-4 border-orange-400",
      text: "text-orange-700",
      description: "Seca moderada. Risco de incêndios e perdas agrícolas.",
    },
    {
      icon: "🚨",
      title: "Emergência",
      border: "border-b-4 border-red-500",
      text: "text-red-700",
      description: "Seca severa. Racionamento pode ser necessário.",
    },
  ];

  return (
    <section
      id="alertas"
      className="min-h-screen flex flex-col justify-center px-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        Da Previsão à Ação: O Sistema de Alertas
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-10">
        As previsões do modelo são traduzidas em um sistema de alerta de quatro
        níveis, comparando a umidade prevista com os dados históricos para
        determinar a severidade da seca. Isso permite que gestores e a
        comunidade tomem ações preventivas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {alertData.map((alert) => (
          <div
            key={alert.title}
            className={`alert-card bg-white p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg ${alert.border}`}
          >
            <p className="text-2xl mb-2">{alert.icon}</p>
            <p className={`font-bold ${alert.text}`}>{alert.title}</p>
            <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

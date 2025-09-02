export default function Alert() {
  const alertData = [
    {
      icon: "✅",
      title: "Normal",
      color: "green",
      description: "Condições de umidade adequadas para a época.",
    },
    {
      icon: "⚠️",
      title: "Atenção",
      color: "yellow",
      description: "Solos mais secos que o normal. Risco de estresse hídrico.",
    },
    {
      icon: "🔥",
      title: "Alerta",
      color: "orange",
      description: "Seca moderada. Risco de incêndios e perdas agrícolas.",
    },
    {
      icon: "🚨",
      title: "Emergência",
      color: "red",
      description: "Seca severa. Racionamento pode ser necessário.",
    },
  ];

  const borderColor = (color: string) => `border-b-4 border-${color}-400`;
  const textColor = (color: string) => `text-${color}-700`;

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
            className={`alert-card bg-white p-6 rounded-lg shadow-md ${borderColor(
              alert.color
            )}`}
          >
            <p className="text-2xl mb-2">{alert.icon}</p>
            <p className={`font-bold ${textColor(alert.color)}`}>
              {alert.title}
            </p>
            <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

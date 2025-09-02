import { useState } from "react";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

const quizBank: QuizQuestion[] = [
  {
    question:
      "Qual evento histórico é citado como a principal evidência da vulnerabilidade hídrica do DF?",
    options: [
      "A crise hídrica e o racionamento de 2017-2018.",
      "O relatório do TCDF de 2010.",
      "A expansão da fronteira agrícola.",
      "A criação do PPCerrado.",
    ],
    answer: "A crise hídrica e o racionamento de 2017-2018.",
  },
  {
    question:
      "Qual é a principal plataforma de computação em nuvem utilizada no projeto?",
    options: [
      "Google Earth Engine (GEE).",
      "Amazon Web Services (AWS).",
      "INMET.",
      "Jupyter Notebook.",
    ],
    answer: "Google Earth Engine (GEE).",
  },
  {
    question:
      "Qual a relação temporal observada no gráfico entre o pico das chuvas e o pico de 'verdor' da vegetação (NDVI)?",
    options: [
      "Ocorrem ao mesmo tempo.",
      "O pico de NDVI ocorre antes da chuva.",
      "O pico de NDVI ocorre visivelmente após o pico de chuvas, indicando uma defasagem.",
      "Não há relação clara.",
    ],
    answer:
      "O pico de NDVI ocorre visivelmente após o pico de chuvas, indicando uma defasagem.",
  },
  {
    question:
      "Qual algoritmo de machine learning foi usado para criar o modelo 'SPH Cerrado'?",
    options: [
      "Regressão Linear.",
      "Random Forest Regressor.",
      "Redes Neurais.",
      "Análise de Percentis.",
    ],
    answer: "Random Forest Regressor.",
  },
  {
    question:
      "Qual foi a performance do modelo, medida pelo R², no conjunto de teste?",
    options: ["0,94.", "0,88.", "0,79.", "0,15."],
    answer: "0,79.",
  },
  {
    question:
      "Qual variável se revelou a mais importante para o modelo prever a umidade do solo?",
    options: ["Precipitação.", "Evapotranspiração.", "NDVI.", "Temperatura."],
    answer: "Evapotranspiração.",
  },
  {
    question:
      "Como o sistema de alertas traduz a previsão numérica em um nível de risco?",
    options: [
      "Utilizando a metodologia de percentis históricos.",
      "Através de uma fórmula de regressão linear.",
      "Com base apenas na precipitação prevista.",
      "Por meio de votação da comunidade.",
    ],
    answer: "Utilizando a metodologia de percentis históricos.",
  },
  {
    question:
      "Qual o principal objetivo do protótipo do app 'Mangaba Cerrado'?",
    options: [
      "Substituir completamente os satélites.",
      "Oferecer previsão do tempo para agricultores.",
      "Permitir a colaboração da comunidade com dados locais.",
      "Vender imagens de satélite.",
    ],
    answer: "Permitir a colaboração da comunidade com dados locais.",
  },
  {
    question:
      "O que significa validar dados de satélite com 'dados terrestres'?",
    options: [
      "Comparar com dados de outro satélite.",
      "Comparar com medições de estações do INMET em solo.",
      "Comparar com informações de drones.",
      "Comparar com enquetes da população.",
    ],
    answer: "Comparar com medições de estações do INMET em solo.",
  },
  {
    question:
      "Qual é a principal mudança de paradigma proposta pelo projeto SPH Cerrado?",
    options: [
      "Substituir monitores humanos por IA.",
      "Focar exclusivamente em grandes rios.",
      "Sair de uma gestão reativa para uma proativa.",
      "Privatizar o monitoramento da água.",
    ],
    answer: "Sair de uma gestão reativa para uma proativa.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    shuffleArray(quizBank).slice(0, 5)
  );

  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
  };

  const handleVerify = () => {
    if (!selectedOption) return;

    const current = questions[currentQuestionIndex];
    if (selectedOption === current.answer) {
      setScore((prev) => prev + 1);
      setFeedback("Resposta Correta!");
    } else {
      setFeedback(`Incorreto. A resposta certa é: ${current.answer}`);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffleArray(quizBank).slice(0, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <section
        id="quiz"
        className="min-h-screen flex flex-col justify-center px-6"
      >
        <div className="section-card rounded-lg p-6 md:p-8 max-w-2xl mx-auto text-center bg-white shadow-md">
          <h3 className="text-2xl font-bold mb-2">Quiz Concluído!</h3>
          <p className="text-lg">
            Seu resultado: <span className="font-black">{score}</span> /{" "}
            {questions.length}
          </p>
          <p className="mt-2 text-gray-600">
            {score === questions.length
              ? "Excelente! Você dominou os conceitos do projeto."
              : score >= questions.length / 2
              ? "Bom trabalho! Você compreendeu os pontos mais importantes."
              : "Continue estudando para aprimorar seus conhecimentos!"}
          </p>
          <button
            onClick={handleRestart}
            className="mt-6 bg-gray-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Refazer o Quiz
          </button>
        </div>
      </section>
    );
  }

  const current = questions[currentQuestionIndex];

  return (
    <section
      id="quiz"
      className="min-h-screen flex flex-col justify-center px-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        Teste Seu Conhecimento
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-10">
        Agora que você explorou o projeto SPH Cerrado, teste o que aprendeu com
        este quiz!
      </p>
      <div className="section-card rounded-lg p-6 md:p-8 max-w-2xl mx-auto bg-white shadow-md">
        <div>
          <div className="text-lg font-semibold text-gray-800 mb-4">
            ({currentQuestionIndex + 1}/{questions.length}) {current.question}
          </div>
          <div className="space-y-3">
            {current.options.map((option) => {
              const isCorrect = feedback && option === current.answer;
              const isIncorrect =
                feedback &&
                option === selectedOption &&
                option !== current.answer;

              return (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  disabled={!!feedback}
                  className={`w-full p-3 border-2 rounded-lg text-left cursor-pointer 
                    ${
                      isCorrect
                        ? "border-green-500 bg-green-100"
                        : isIncorrect
                        ? "border-red-500 bg-red-100"
                        : selectedOption === option
                        ? "border-[#A0522D] bg-orange-50"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {feedback && (
            <p
              className={`mt-4 text-sm font-semibold ${
                feedback.startsWith("Resposta")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}
          {!feedback ? (
            <button
              onClick={handleVerify}
              disabled={!selectedOption}
              className="mt-6 bg-[#A0522D] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#804224] transition-colors w-full disabled:opacity-50 cursor-pointer"
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="mt-6 bg-[#A0522D] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#804224] transition-colors w-full cursor-pointer"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Ver Resultado"
                : "Próxima Pergunta"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

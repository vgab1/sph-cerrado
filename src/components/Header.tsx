const sections = [
  { name: "O Problema", id: "problema" },
  { name: "A Solução", id: "solucao" },
  { name: "Análise de Dados", id: "analise" },
  { name: "Modelo Preditivo", id: "modelo" },
  { name: "Previsão Futura", id: "previsao" },
  { name: "Alertas e Ação", id: "alertas" },
  { name: "Ciência Cidadã", id: "ciencia" },
  { name: "Quiz", id: "quiz" },
];

export default function Header() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scroll({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-stone-50 border-b border-gray-200 fixed w-full z-50">
      <h1 className="text-2xl font-extrabold text-amber-800 tracking-tight">
        SPH Cerrado
      </h1>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleScroll(section.id)}
            className="hover:text-amber-800 hover:underline underline-offset-4 cursor-pointer"
          >
            {section.name}
          </button>
        ))}
      </nav>
      <button className="md:hidden p-2 text-gray-700 hover:text-amber-800">
        ☰
      </button>
    </header>
  );
}

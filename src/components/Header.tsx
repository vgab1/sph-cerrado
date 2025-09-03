import { useState, useEffect, useCallback } from "react";

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
  const [activeSection, setActiveSection] = useState("problema");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scroll({ top: y, behavior: "smooth" });
      setActiveSection(id); 
      setIsMenuOpen(false); 
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" } 
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-stone-50 border-b border-gray-200 fixed w-full z-50">
      <h1 className="text-2xl font-extrabold text-amber-800 tracking-tight">
        SPH Cerrado
      </h1>
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleScroll(section.id)}
            className={`hover:underline underline-offset-4 cursor-pointer ${
              activeSection === section.id
                ? "text-amber-800 font-bold"
                : "text-gray-700"
            }`}
          >
            {section.name}
          </button>
        ))}
      </nav>
      <div className="md:hidden relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
          className="p-2 text-gray-700 hover:text-amber-800"
        >
          ☰
        </button>

        {isMenuOpen && (
          <nav className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg flex flex-col">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className={`px-4 py-2 text-left hover:bg-amber-100 ${
                  activeSection === section.id ? "bg-amber-100 font-bold" : ""
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

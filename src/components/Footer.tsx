export default function Footer() {
  return (
    <footer className="bg-white py-4 border-t border-gray-200">
      <div className="container mx-auto px-6 text-center text-gray-600">
        <p className="font-bold text-lg">SPH Cerrado</p>
        <p className="text-sm mb-4">
          Uma iniciativa do Projeto Mangaba Cerrado para o 14º Circuito de
          Ciências.
        </p>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} SPH Cerrado. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

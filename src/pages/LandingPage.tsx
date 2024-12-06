import { MdAttachMoney, MdOutlineFilterAlt, MdSearch } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import ContactForm from "../views/ContactForm";

import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };
  const handleSignup = () => {
    Navigate("/registro");
  };

  return (
    <>
      <div className="transition min-h-screen bg-gradient-to-b from-blue-100 to-white">
        {/* Header */}
        <header className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">
            FinanzApp
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Tu compañero inteligente para el control de finanzas personales
          </p>
          <div className="flex gap-x-2  items-center justify-center ">
            <button
              onClick={handleLogin}
              className="text-base text-white bg-black px-8 py-3 rounded-md hover:opacity-[0.7]"
            >
              Iniciar sesión
            </button>
            <button
              onClick={handleSignup}
              className="text-base text-white bg-black px-8 py-3 rounded-md hover:opacity-[0.7]"
            >
              Registrarse
            </button>
          </div>
        </header>

        {/* Main */}
        <main id="about" className="container mx-auto px-4 py-8">
          {/* Hero Section */}

          {/* Features Section */}
          <section id="features" className="py-12 md:py-24 lg:py-24">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                Características Principales
              </h2>
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <Card
                  icon={
                    <MdAttachMoney className="h-12 w-12 mb-4 text-primary" />
                  }
                  title="Registro de Transacciones"
                  description="Añade tus ingresos y gastos fácilmente. Clasifica tus transacciones con etiquetas personalizadas."
                />
                <Card
                  icon={
                    <MdOutlineFilterAlt className="h-12 w-12 mb-4 text-primary" />
                  }
                  title="Filtros Avanzados"
                  description="Filtra tus transacciones por categoría, fecha, tipo de gasto o ingresos para analizar tus finanzas rápidamente."
                />
                <Card
                  icon={
                    <FaBalanceScale className="h-12 w-12 mb-4 text-primary" />
                  }
                  title="Balance Total"
                  description="Obtén un resumen de tus ingresos, gastos y el balance total en tiempo real."
                />
                <Card
                  icon={<MdSearch className="h-12 w-12 mb-4 text-primary" />}
                  title="Búsqueda Detallada"
                  description="Encuentra rápidamente cualquier transacción usando nuestra función de búsqueda avanzada."
                />
              </div>
            </div>
          </section>

          <section id="contact">
            <ContactForm />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-background/95 text-foreground py-8">
          <div className="container flex flex-col items-center">
            <p className="text-center text-xl">
              Creado por{" "}
              <a
                href="https://cristianencarnacion.netlify.app/"
                className="text-primary hover:underline text-gray-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                Cristian Encarnacion
              </a>
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                href="https://github.com/cristianEncarnacion/"
                className="text-xl text-primary bg-black text-white px-4 py-2 rounded-md"
                rel="noopener noreferrer"
                target="_blank"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/cristian-encarnacion-19649a304/"
                className="text-xl text-primary bg-black text-white px-4 py-2 rounded-md"
                rel="noopener noreferrer"
                target="_blank"
              >
                Linkedin
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;

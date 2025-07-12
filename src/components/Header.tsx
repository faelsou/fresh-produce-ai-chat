import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { sendPhotoInstruction } from "@/utils/whatsapp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍇</span>
            <span className="text-xl font-bold font-poppins text-gray-900">FindFruit</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('problema')} className="text-gray-600 hover:text-fruit-green-600 transition-colors">
              Problema
            </button>
            <button onClick={() => scrollToSection('como-funciona')} className="text-gray-600 hover:text-fruit-green-600 transition-colors">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('beneficios')} className="text-gray-600 hover:text-fruit-green-600 transition-colors">
              Benefícios
            </button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-gray-600 hover:text-fruit-green-600 transition-colors">
              Depoimentos
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-fruit-green-600 transition-colors">
              FAQ
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={sendPhotoInstruction}
              className="fruit-gradient text-white hover:opacity-90 transition-opacity"
            >
              Começar Grátis
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-fruit-green-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('problema')} className="text-left text-gray-600 hover:text-fruit-green-600 transition-colors">
                Problema
              </button>
              <button onClick={() => scrollToSection('como-funciona')} className="text-left text-gray-600 hover:text-fruit-green-600 transition-colors">
                Como Funciona
              </button>
              <button onClick={() => scrollToSection('beneficios')} className="text-left text-gray-600 hover:text-fruit-green-600 transition-colors">
                Benefícios
              </button>
              <button onClick={() => scrollToSection('depoimentos')} className="text-left text-gray-600 hover:text-fruit-green-600 transition-colors">
                Depoimentos
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-left text-gray-600 hover:text-fruit-green-600 transition-colors">
                FAQ
              </button>
              <Button 
                onClick={sendPhotoInstruction}
                className="fruit-gradient text-white hover:opacity-90 transition-opacity w-full"
              >
                Começar Grátis
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

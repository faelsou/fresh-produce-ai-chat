
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu } from "lucide-react";
import { useState } from "react";

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
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full fruit-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">🥭</span>
            </div>
            <span className="text-2xl font-bold font-poppins text-gray-900">FindFruit</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-gray-600 hover:text-fruit-green-600 transition-colors"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollToSection('beneficios')}
              className="text-gray-600 hover:text-fruit-green-600 transition-colors"
            >
              Benefícios
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')}
              className="text-gray-600 hover:text-fruit-green-600 transition-colors"
            >
              Depoimentos
            </button>
            <Button className="fruit-gradient text-white hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4 mr-2" />
              Experimentar Grátis
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="text-left text-gray-600 hover:text-fruit-green-600 transition-colors"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection('beneficios')}
                className="text-left text-gray-600 hover:text-fruit-green-600 transition-colors"
              >
                Benefícios
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')}
                className="text-left text-gray-600 hover:text-fruit-green-600 transition-colors"
              >
                Depoimentos
              </button>
              <Button className="fruit-gradient text-white w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Experimentar Grátis
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

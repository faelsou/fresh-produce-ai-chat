
import { MessageCircle, Mail, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full fruit-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">🥭</span>
              </div>
              <span className="text-2xl font-bold font-poppins">FindFruit</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Seu assistente inteligente para escolher as melhores frutas e legumes. 
              Simples, rápido e gratuito.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:contato@findfruit.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li><a href="#como-funciona" className="text-gray-400 hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">Benefícios</a></li>
              <li><a href="#depoimentos" className="text-gray-400 hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Perguntas Frequentes</a></li>
              <li><a href="mailto:contato@findfruit.com" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Reportar Problema</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-fruit-green-400" />
                <span className="text-gray-400">(11) 94523-7617</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-fruit-green-400" />
                <span className="text-gray-400">contato@findfruit.com</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300 mb-2">Experimente agora:</p>
              <a 
                href="https://wa.me/5511945237617" 
                className="inline-flex items-center space-x-2 text-fruit-green-400 hover:text-fruit-green-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Abrir WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 FindFruit. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

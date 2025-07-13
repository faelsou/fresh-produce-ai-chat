
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Smartphone, CreditCard } from "lucide-react";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import { openWhatsApp, sendPhotoInstruction } from "@/utils/whatsapp";

const CTA = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handlePhoneClick = () => {
    openWhatsApp("Olá! Gostaria de saber mais sobre os planos do FindFruit.");
  };

  return (
    <>
      <section className="py-20 fruit-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center text-white space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins leading-tight">
              Pronto para nunca mais errar na escolha das suas frutas?
            </h2>
            
            <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Junte-se a mais de 10.000 pessoas que já descobriram o segredo para escolher as melhores frutas e legumes
            </p>

            <div className="flex flex-col items-center space-y-6 pt-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={sendPhotoInstruction}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Começar Agora - É Grátis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={handlePhoneClick}
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  (11) 94523-7617
                </Button>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={() => setIsPaymentOpen(true)}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Ver Planos
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-green-100 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span>Teste grátis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span>Sem cadastro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span>Resposta em segundos</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Como começar:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <p className="text-sm">Clique no botão acima</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <p className="text-sm">Abra o WhatsApp</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <p className="text-sm">Envie uma foto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </>
  );
};

export default CTA;


import { Camera, MessageCircle, Sparkles, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Camera className="w-12 h-12 text-fruit-green-600" />,
      step: "1",
      title: "Tire uma foto",
      description: "Envie uma foto ou vídeo da sua fruta ou legume pelo WhatsApp"
    },
    {
      icon: <Sparkles className="w-12 h-12 text-fruit-orange-500" />,
      step: "2", 
      title: "Análise instantânea",
      description: "Nossa inteligência artificial identifica o tipo e estado de maturação"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-purple-500" />,
      step: "3",
      title: "Receba o resultado",
      description: "Diagnóstico completo com dicas e receitas"
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
      step: "4",
      title: "Receitas personalizadas",
      description: "Receba sugestões de receitas práticas para aproveitar melhor"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 fresh-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
            Como funciona o FindFruit?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            É simples, rápido e funciona 100% pelo WhatsApp. Veja como em 4 passos:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="relative bg-white border-2 border-gray-100 hover:border-fruit-green-200 transition-all duration-300 hover:shadow-xl overflow-hidden group">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="relative">
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-fruit-green-500 to-fruit-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-fruit-green-400 to-fruit-orange-400"></div>
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-fruit-orange-400 transform rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Exemplo de conversa no WhatsApp
            </h3>
            
            <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto space-y-4">
              <div className="flex justify-end">
                <div className="bg-fruit-green-500 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-xs">
                  <p className="text-sm">📸 *foto da manga*</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-white border rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs shadow-sm">
                  <p className="text-sm text-gray-800">🔍 Analisando sua imagem...</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-white border rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs shadow-sm">
                  <div className="text-sm text-gray-800 space-y-1">
                    <p>✅ <strong>Manga madura no ponto ideal!</strong></p>
                    <p>🍃 Rica em vitamina C e A</p>
                    <p>📅 Melhor época: outubro a janeiro</p>
                    <p>🥗 <strong>Receita:</strong> Salada tropical com rúcula</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


import { AlertTriangle, Clock, HelpCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Problem = () => {
  const problems = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      title: "Frutas estragadas",
      description: "Você compra frutas e não sabe se estão maduras ou passadas"
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-orange-500" />,
      title: "Falta de conhecimento",
      description: "Não sabe qual a melhor época para consumir cada fruta"
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      title: "Tempo perdido",
      description: "Gasta muito tempo pesquisando informações nutricionais"
    },
    {
      icon: <Trash2 className="w-8 h-8 text-gray-500" />,
      title: "Desperdício de comida",
      description: "Joga fora alimentos que poderiam ser aproveitados"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
            Você já passou por isso?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sabemos como é frustrante não saber se uma fruta está no ponto certo ou como aproveitá-la melhor
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="border-2 border-gray-100 hover:border-fruit-green-200 transition-all duration-300 hover:shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  {problem.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {problem.title}
                </h3>
                <p className="text-gray-600">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              E se você pudesse resolver tudo isso em segundos?
            </h3>
            <p className="text-lg text-gray-700">
              Com o FindFruit, basta uma foto para ter todas as respostas que precisa!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;

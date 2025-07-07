
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Dona de casa",
      avatar: "👩‍🦳",
      rating: 5,
      text: "Agora nunca mais compro frutas passadas! O FindFruit me ajuda a escolher as melhores no mercado e ainda dá receitas deliciosas."
    },
    {
      name: "João Santos",
      role: "Chef de cozinha",
      avatar: "👨‍🍳",
      rating: 5,
      text: "Como chef, preciso de ingredientes perfeitos. O FindFruit é meu assistente pessoal para identificar o ponto ideal de cada fruta."
    },
    {
      name: "Ana Costa",
      role: "Nutricionista",
      avatar: "👩‍⚕️",
      rating: 5,
      text: "Recomendo para todos os meus pacientes. As informações nutricionais são precisas e ajudam muito na educação alimentar."
    },
    {
      name: "Carlos Oliveira",
      role: "Fruteiro",
      avatar: "👨‍💼",
      rating: 5,
      text: "Uso para verificar meu estoque e orientar clientes. Aumentou muito a confiança dos consumidores na minha loja."
    },
    {
      name: "Fernanda Lima",
      role: "Mãe de família",
      avatar: "👩‍👧‍👦",
      rating: 5,
      text: "Meus filhos agora comem mais frutas porque sei exatamente quando elas estão saborosas. E as receitas são práticas!"
    },
    {
      name: "Ricardo Pereira",
      role: "Personal trainer",
      avatar: "💪",
      rating: 5,
      text: "Ajudo meus alunos a escolherem as melhores frutas pré e pós-treino. O FindFruit é uma ferramenta incrível!"
    }
  ];

  return (
    <section id="depoimentos" className="py-20 fresh-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
            O que nossos usuários dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 10.000 pessoas já transformaram sua relação com frutas e legumes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-white border-2 border-gray-100 hover:border-fruit-green-200 transition-all duration-300 hover:shadow-xl animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-fruit-green-400" />
                </div>

                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">4.9/5</span>
            </div>
            <p className="text-lg text-gray-600 mb-2">
              Baseado em mais de 5.000 avaliações
            </p>
            <p className="text-sm text-gray-500">
              "O melhor app para quem quer ter uma alimentação mais saudável e consciente"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

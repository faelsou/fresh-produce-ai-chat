
export const openWhatsApp = (message?: string) => {
  const phoneNumber = "5511999999999"; // Substitua pelo número real
  const defaultMessage = "Olá! Gostaria de experimentar o FindFruit. Como posso começar?";
  const finalMessage = message || defaultMessage;
  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

export const sendPhotoInstruction = () => {
  const message = "Olá! Quero analisar uma fruta ou legume. Como devo enviar a foto?";
  openWhatsApp(message);
};

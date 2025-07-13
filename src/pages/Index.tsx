
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";

const Index = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onPricingClick={() => setIsPaymentOpen(true)} />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <PricingPlans />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </div>
  );
};

export default Index;

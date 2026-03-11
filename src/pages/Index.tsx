import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import QuizSection from "@/components/QuizSection";
import UrgentSection from "@/components/UrgentSection";
import FormSection from "@/components/FormSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <QuizSection />
      <UrgentSection />
      <FormSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;

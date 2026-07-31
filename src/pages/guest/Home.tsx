import Header from "../../components/guest/Header";
import Hero from "../../components/guest/Hero";
import Programs from "../../components/guest/Programs";
import TrialForm from "../../components/guest/TrialForm";
import Footer from "../../components/guest/Footer";
import MapSection from "../../components/guest/MapSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--surface-500)] flex flex-col justify-between">
      <div>
        <Header />
        <main className="px-4 md:px-8 lg:px-12 xl:px-20 max-w-7xl mx-auto space-y-12 md:space-y-16">
          <Hero />
          <Programs />
          <div className="py-8 md:py-12">
            <TrialForm />
          </div>
        </main>
      </div>
      <div>
        <Footer />
        <MapSection />
      </div>
    </div>
  );
}

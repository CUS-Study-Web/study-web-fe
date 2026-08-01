import Hero from "../../components/guest/Hero";
import Programs from "../../components/guest/Programs";
import TrialForm from "../../components/guest/TrialForm";

export default function Home() {
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-20 max-w-7xl mx-auto space-y-12 md:space-y-16 pb-16">
      <Hero />
      <Programs />
      <div className="py-8 md:py-12">
        <TrialForm />
      </div>
    </div>
  );
}

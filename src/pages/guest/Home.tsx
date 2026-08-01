import Hero from "../../components/guest/Hero";
import Programs from "../../components/guest/Programs";
import TrialForm from "../../components/guest/TrialForm";

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen overflow-x-hidden">
      <Hero />
      <Programs />
      <TrialForm />
    </div>
  );
}

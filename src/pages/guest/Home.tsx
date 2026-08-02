import Hero from "../../components/guest/home/Hero";
import Programs from "../../components/guest/home/Programs";
import TrialForm from "../../components/guest/home/TrialForm";

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen overflow-x-hidden">
      <Hero />
      <Programs />
      <TrialForm />
    </div>
  );
}

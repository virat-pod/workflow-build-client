import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/work";
import Features from "@/components/home/features";

export default function Home() {
  return (
 <main className="flex theme flex-col py-12">
  <Hero/>
  <HowItWorks/>
  <Features/>
 </main>
  );
}

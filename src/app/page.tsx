import { Hero } from "@/components/home/Hero";
import { QuickLinks } from "@/components/home/QuickLinks";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { About } from "@/components/home/About";
import { Actions } from "@/components/home/Actions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <FeaturedEvent />
      <About />
      <Actions />
    </>
  );
}

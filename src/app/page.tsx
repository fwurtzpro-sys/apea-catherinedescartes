import { Hero } from "@/components/home/Hero";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { About } from "@/components/home/About";
import { Actions } from "@/components/home/Actions";
import { ChildrenActivitiesShowcase } from "@/components/home/ChildrenActivitiesShowcase";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedEvent />
      <About />
      <Actions />
      <ChildrenActivitiesShowcase />
    </>
  );
}

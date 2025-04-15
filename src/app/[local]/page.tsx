import About from "@/components/about";
import BestSallers from "./_components/BestSallers";
import Hero from "./_components/Hero";
import Contact from "@/components/contact";


export default  function Home() {
  
 
  return (
    <main>
      <Hero/>
      <BestSallers/>
      <About/>
      <Contact/>
    </main>
  );
}

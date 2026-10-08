import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Tudo from "@/components/sections/Tudo";
import Manifesto from "@/components/sections/Manifesto";
import Porque from "@/components/sections/Porque";
import Solucao from "@/components/sections/Solucao";
import Depoimentos from "@/components/sections/Depoimentos";
import Clientes from "@/components/sections/Clientes";
import Lideres from "@/components/sections/Lideres";
import Contratar from "@/components/sections/Contratar";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tudo />
        <Manifesto />
        <Porque />
        <Solucao />
        <Depoimentos />
        <Clientes />
        <Lideres />
        <Contratar />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

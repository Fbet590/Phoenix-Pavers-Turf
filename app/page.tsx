import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { WhyUs } from "@/components/landing/why-us"
import { Gallery } from "@/components/landing/gallery"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhyUs />
      <Gallery />
      <FAQ />
      <Footer />
    </main>
  )
}

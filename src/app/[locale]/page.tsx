import Header from '@/components/header'
import Hero from '@/components/hero'
import About from '@/components/about'
import Services from '@/components/services'
import WhyUs from '@/components/why-us'
import MissionVision from '@/components/mission-vision'
import Testimonials from '@/components/testimonials'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <MissionVision />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

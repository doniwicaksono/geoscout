import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-base flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  )
}


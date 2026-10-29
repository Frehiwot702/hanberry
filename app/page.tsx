import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero';
import MakeupIntro from '@/components/welcome';
import Features from '@/components/features';
import AboutHamneal from '@/components/abouthamnel';
import MakeupGallery from '@/components/makeups';
import WorksInHome from '@/components/worksinhome';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Videos from '@/components/Videos';
import Providers from '@/components/postHogProvider';
import Services from '@/components/Services';

export default function Home() {
  return (
    <Providers>
      <div style={{fontFamily: 'cormorant'}}>
        <Navbar />
        <HeroSection/>
        <MakeupIntro/>
        <Videos/>
        <MakeupGallery/>
        <Services/>
        {/* <Booking/> */}
        <WorksInHome/>
        <AboutHamneal/>
        <Features/>   
        <Contact/>
        <Footer/>
      </div>
    </Providers>
  );
}
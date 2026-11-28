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

  // for local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Hanberry Beauty',
    alternateName: 'Hamneal Nebiyu Makeup Artist',
    image: 'https://hanberry.minab.et/images/HanBerry BEAUTY.png',
    '@id': 'https://hanberry.minab.et',
    url: 'https://hanberry.minab.et',
    telephone: '+251935712362',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
    areaServed: {
      '@type': 'City',
      name: 'Addis Ababa',
    },
    founder: {
      '@type': 'Person',
      name: 'Hamneal Nebiyu',
      jobTitle: 'Professional Makeup Artist',
    },
    sameAs: [
      'https://www.instagram.com/hamneal_nebiyu/',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        // opens: '09:00',
        // closes: '18:00',
      },
    ],
  };

  return (
    <Providers>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className='font-body'>
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
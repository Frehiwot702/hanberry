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
    '@type': 'EthiopianBeautySalon',
    name: 'Hanberry Beauty',
    image: 'https://hanberry.minab.et/images/HanBerry BEAUTY.png',
    '@id': 'https://hanberry.minab.et',
    url: 'https://hanberry.minab.et',
    telephone: '+251 935 71 23 62',
    address: {
      '@type': 'addressLocality',
      streetAddress: 'Addis Ababa, Ethiopia',
      addressLocality: 'Addis Ababa',
      addressRegion: 'Addis Ababa', 
      addressCountry: 'ET',
    },
    // geo: {
    //   '@type': 'GeoCoordinates',
    //   latitude: 40.7128,
    //   longitude: -74.0060,
    // },
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
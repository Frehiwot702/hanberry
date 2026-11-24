"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const copy = {
  en: {
    tagline: "HanBerry Beauty Lounge",
    headline: "Timeless beauty, artfully composed.",
    description:
      "Bridal, occasion, and signature makeup artistry crafted with premium products, refined detail, and a calm, confidence-giving touch.",
    primaryCta: "Book an Appointment",
    secondaryCta: "Explore Our Work",
    heroAltMain: "Elegant bridal makeup portrait at HanBerry Beauty",
    heroAltAccent: "Soft glam makeup detail at HanBerry Beauty",
  },
  am: {
    tagline: "ሃንቤሪ ቢዩቲ ላውንጅ",
    headline: "ጊዜ የማይሽረው ውበት፣ በጥበብ የተሰራ።",
    description:
      "ለሙሽራ፣ ለልዩ ዝግጅቶች እና ለዕለታዊ ውበት የሚሆን ሜካፕ በፕሪሚየም ምርቶች፣ በጥሩ ዝርዝር እና በራስ መተማመን የሚሰጥ ንክኪ ይዘጋጃል።",
    primaryCta: "ቀጠሮ ይያዙ",
    secondaryCta: "ሥራዎቻችንን ይመልከቱ",
    heroAltMain: "በሃንቤሪ ቢዩቲ የተዘጋጀ የሙሽራ ሜካፕ ምስል",
    heroAltAccent: "በሃንቤሪ ቢዩቲ የተዘጋጀ ለስላሳ የሜካፕ ዝርዝር",
  },
};

function HeroSection() {
  const locale = useLocale();
  const content = locale === "am" ? copy.am : copy.en;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#FAF6F0] text-[#231814] pb-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#E7D6C8]/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#DCC7A1]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-4/5 grid-cols-1 items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 flex max-w-xl flex-col lg:order-1"
        >
          <p className="mb-5 flex items-center gap-3 text-xs tracking-[0.28em] text-[#AD8A55] uppercase sm:text-sm">
            <span className="h-px w-10 bg-[#C9A34E]/70" aria-hidden="true" />
            {content.tagline}
          </p>

          <h1 className="font-brand text-3xl md:text-5xl leading-[1.05] text-[#231814] sm:text-6xl lg:text-7xl">
            {content.headline}
          </h1>

          <p className="font-body mt-6 max-w-lg text-md md:text-base leading-relaxed text-[#4B4038] sm:text-lg">
            {content.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#booking"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#231814] bg-[#231814] px-8 py-3 text-sm font-medium tracking-wide text-[#FAF6F0] transition-colors duration-300 hover:bg-[#AD8A55] hover:border-[#AD8A55] hover:text-white sm:text-base"
            >
              {content.primaryCta}
            </Link>
            <Link
              href="#works"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9A34E]/60 bg-transparent px-8 py-3 text-sm font-medium tracking-wide text-[#231814] transition-colors duration-300 hover:border-[#AD8A55] hover:bg-[#F3EBDD] sm:text-base"
            >
              {content.secondaryCta}
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-[#6B5B4B]">
            <span className="h-px w-12 bg-[#C9A34E]/60" aria-hidden="true" />
            <span className="font-heading text-lg italic text-[#8B7A5D]">
              HanBerry Beauty
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="order-1 relative mx-auto w-full max-w-xl lg:order-2"
        >
          <div className="relative ml-auto w-[86%] sm:w-[80%]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#E7DCCB] bg-[#EFE6DA] shadow-[0_20px_60px_rgba(35,24,20,0.08)]">
              <Image
                src="/images/book-3.PNG"
                alt={content.heroAltMain}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="pointer-events-none absolute -left-3 -top-3 h-20 w-20 rounded-tl-[1.75rem] border-l border-t border-[#C9A34E]/50 sm:-left-5 sm:-top-5 sm:h-28 sm:w-28" />
          </div>

          <div className="absolute -bottom-6 left-0 w-[46%] sm:-bottom-8 sm:w-[42%]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-[#EADFCC] bg-[#F6EFE6] shadow-[0_16px_40px_rgba(35,24,20,0.12)]">
              <Image
                src="/images/h1.PNG"
                alt={content.heroAltAccent}
                fill
                sizes="(max-width: 1024px) 45vw, 18vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute -right-2 bottom-10 hidden h-24 w-24 rounded-full border border-[#D8C3A5]/70 sm:block" />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
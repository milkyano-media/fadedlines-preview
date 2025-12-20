import Layout from "@/components/web/WebLayout";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";

import Amir from "@/assets/web/barbers/amir.png";
import Rayhan from "@/assets/web/barbers/rayhan.png";
// import Anthony from "@/assets/web/barbers/anthony.png";
import Jay from "@/assets/web/barbers/jay.png";
// import Wyatt from "@/assets/web/barbers/wyatt.png";
import Emman from "@/assets/web/barbers/emman.png";
import Dejan from "@/assets/web/barbers/dejan.png";
// import Christos from "@/assets/web/barbers/christos.png";
import Josh from "@/assets/web/barbers/josh.png";
import Niko from "@/assets/web/barbers/niko.png";
import Noah from "@/assets/web/barbers/noah.png";
// import Jamie from "@/assets/web/barbers/jamie.png";
import Lucas from "@/assets/web/barbers/lucas.png";
import Can from "@/assets/web/barbers/can.png";
import { Link, useLocation } from "react-router-dom";
import BgHero2 from "@/assets/web/home/hero.svg";
// import Hero from "@/assets/web/home/hero.svg";

export default function Barbers() {
  localStorage.removeItem("booking_source");

  const location = useLocation();

  // Gallery state management
  const [selectedBarber, setSelectedBarber] = useState(0);
  const previewImageRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getQueryParams = (search: string) => {
    return new URLSearchParams(search);
  };

  const queryParams = getQueryParams(location.search);
  const fbclid = queryParams.get("fbclid");
  const ttclid = queryParams.get("ttclid");
  const gclid = queryParams.get("gclid");

  const trackingData = {
    utm_source: queryParams.get("utm_source"),
    utm_medium: queryParams.get("utm_medium"),
    utm_campaign: queryParams.get("utm_campaign"),
    utm_content: queryParams.get("utm_content"),
    fbclid: queryParams.get("fbclid"),
  };

  localStorage.setItem("booking_source", JSON.stringify(trackingData));

  if (trackingData.fbclid && trackingData.utm_source) {
    localStorage.setItem("customer_source", JSON.stringify(trackingData));
  }

  localStorage.setItem("utm_source", queryParams.get("utm_source") || "None");
  localStorage.setItem("utm_medium", queryParams.get("utm_medium") || "None");
  localStorage.setItem(
    "utm_campaign",
    queryParams.get("utm_campaign") || "None",
  );
  localStorage.setItem("utm_content", queryParams.get("utm_content") || "None");

  if (fbclid) {
    localStorage.setItem("booking_origin", "facebook");
  } else if (ttclid) {
    localStorage.setItem("booking_origin", "tiktok");
  } else if (gclid) {
    localStorage.setItem("booking_origin", "google");
  } else {
    localStorage.setItem("booking_origin", "organic");
  }

  const generateRoute = (route: string): string => {
    const parts = location.pathname.split("/");
    if (parts[1] === "meta") {
      return `/meta${route}`;
    } else {
      return route;
    }
  };

  const generateLink = () => {
    const squareLink: string =
      "https://book.squareup.com/appointments/ud9yhcwfqc1fg0/location/LY7BZ89WAQ2QS/services";

    let bookLink: string;
    const parts = location.pathname.split("/");
    if (parts[1] === "meta") {
      bookLink = `/meta/book/services`;
    } else {
      bookLink = "/book/services";
    }

    const customize: boolean = true;
    if (customize) {
      return bookLink;
    } else {
      return squareLink;
    }
  };

  const barberSvgs = [
    {
      svg: Amir,
      link: generateRoute("/amir"),
      landing: true,
    },
    {
      svg: Lucas,
      link: generateRoute("/lucas"),
      landing: true,
    },
    {
      svg: Can,
      link: generateRoute("/can"),
      landing: true,
    },
    {
      svg: Rayhan,
      link: generateRoute("/rayhan"),
      landing: true,
    },
    {
      svg: Josh,
      link: generateRoute("/josh"),
      landing: true,
    },
    {
      svg: Noah,
      link: generateRoute("/noah"),
      landing: true,
    },
    {
      svg: Jay,
      link: generateRoute("/jay"),
      landing: true,
    },
    {
      svg: Emman,
      link: generateRoute("/emman"),
      landing: true,
    },
    // {
    //   svg: Jamie,
    //   link: generateRoute("/jamie"),
    //   landing: false,
    // },
    // {
    //   svg: Anthony,
    //   link: generateRoute("/anthony"),
    //   landing: true,
    // },
    {
      svg: Niko,
      link: generateRoute("/niko"),
      landing: true,
    },
    {
      svg: Dejan,
      link: generateRoute("/dejan"),
      landing: false,
    },

  ];

  // Transform barberSvgs into gallery-friendly format
  const galleryBarbers = barberSvgs.map((barber, index) => ({
    image: barber.svg,
    name: barber.link.split('/').pop()?.toUpperCase() || `BARBER ${index + 1}`,
    link: barber.link,
    landing: barber.landing,
  }));

  // Interaction handlers for gallery
  const handleThumbnailClick = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedBarber(index);

    // Smooth scroll to preview with offset
    setTimeout(() => {
      if (previewImageRef.current) {
        const yOffset = -120; // Account for header
        const y = previewImageRef.current.getBoundingClientRect().top +
                  window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNameClick = (index: number) => {
    setSelectedBarber(index);
    // Scroll to preview
    setTimeout(() => {
      if (previewImageRef.current) {
        const yOffset = -120;
        const y = previewImageRef.current.getBoundingClientRect().top +
                  window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  // Auto-center the carousel when selection changes OR on initial mount
  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const buttons = carousel.querySelectorAll('button');
      const selectedButton = buttons[selectedBarber];

      if (selectedButton) {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
          const carouselWidth = carousel.offsetWidth;
          const buttonLeft = selectedButton.offsetLeft;
          const buttonWidth = selectedButton.offsetWidth;
          const scrollPosition = buttonLeft - (carouselWidth / 2) + (buttonWidth / 2);

          carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [selectedBarber]);

  // Initial centering on mount
  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const buttons = carousel.querySelectorAll('button');
      const selectedButton = buttons[0]; // Center first barber initially

      if (selectedButton) {
        setTimeout(() => {
          const carouselWidth = carousel.offsetWidth;
          const buttonLeft = selectedButton.offsetLeft;
          const buttonWidth = selectedButton.offsetWidth;
          const scrollPosition = buttonLeft - (carouselWidth / 2) + (buttonWidth / 2);

          carousel.scrollTo({
            left: scrollPosition,
            behavior: 'auto' // No animation on initial load
          });
        }, 100);
      }
    }
  }, []); // Empty dependency array = run once on mount

  useEffect(() => {
    // Create a new style element
    const style = document.createElement("style");

    // Define the animation
    style.innerHTML = `
        @keyframes move {
            0% { transform: translateX(100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(-100%); opacity: 0; }
        }`;

    // Append the style element to the document head
    document.head.appendChild(style);

    // Clean up function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Layout gap="gap-0">
      <Helmet>
        <title>Barbers - Fadelines Barber Shop</title>
        <meta
          name="description"
          content="Fadelines - A premier barber shop offering top-notch haircuts and styles."
        />
        <meta property="og:title" content="Fadelines Barber Shop" />
        <meta
          property="og:description"
          content="Fadelines - A premier barber shop offering top-notch haircuts and styles."
        />
        <meta property="og:img" content="URL to Fadelines' preview img" />
        <meta property="og:url" content="URL to Fadelines' website" />
        <meta name="twitter:card" content="summary_large_img" />
      </Helmet>

      <section className="flex flex-col justify-center items-center relative pt-40">
        <img
          alt="hero image"
          width={500}
          height={500}
          src={BgHero2}
          className="top-0 absolute w-full h-full object-cover -z-10"
        />
        <div className="top-0 absolute w-full h-full object-cover z-0 bg-gradient-to-b from-black/80 to-black" />
        <div className="flex flex-col justify-center items-center text-center gap-6 z-10">
          <div className="flex flex-col mb-12">
            <h2>MEET OUR</h2>
            <h2 className="text-[#33FF00]">BARBERS</h2>
          </div>

          <svg
            className="w-7 mt-8"
            viewBox="0 0 55 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50.582 0.216618L54.9987 4.63745L30.9279 28.7166C30.5422 29.1048 30.0835 29.4128 29.5783 29.623C29.0731 29.8332 28.5313 29.9414 27.9841 29.9414C27.4369 29.9414 26.8951 29.8332 26.3899 29.623C25.8847 29.4128 25.4261 29.1048 25.0404 28.7166L0.957032 4.63745L5.3737 0.220782L27.9779 22.8208L50.582 0.216618Z"
              fill="#33FF00"
            />
          </svg>
        </div>
      </section>

      <section className="relative z-20 w-full min-h-screen flex flex-col justify-center md:max-w-screen-xl mx-auto pt-8 md:pt-12 pb-[12rem] md:pb-[4rem]">
        <div className="container mx-auto px-4 md:px-8">

          {/* BARBER NAME CAROUSEL HEADER */}
          <div
            ref={carouselRef}
            className="relative flex overflow-x-auto gap-2 md:gap-4 items-center mb-8 md:mb-12 pb-[5px] scrollbar-hide px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'hidden' }}
          >
            {/* Left spacer untuk centering item pertama */}
            <div className="flex-shrink-0" style={{ width: 'calc(50vw - 150px)' }}></div>

            {galleryBarbers.map((barber, index) => {
              const distance = Math.abs(selectedBarber - index);
              const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.2;
              const scale = distance === 0 ? 1.2 : distance === 1 ? 0.9 : 0.7;

              return (
                <button
                  key={index}
                  onClick={() => handleNameClick(index)}
                  className={`relative flex-shrink-0 px-6 md:px-8 py-3 pb-4 text-xl md:text-4xl font-bold font-poppins whitespace-nowrap transition-all duration-500 cursor-pointer ${
                    selectedBarber === index
                      ? "text-[#33FF00]"
                      : "text-stone-500"
                  }`}
                  style={{
                    opacity: opacity,
                    transform: `scale(${scale})`,
                  }}
                >
                  {barber.name}

                  {/* GREEN UNDERLINE for active */}
                  {selectedBarber === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#33FF00]"></div>
                  )}

                  {/* DIMMED GREEN SPOTLIGHT GRADIENT EFFECT - From Bottom Up */}
                  {selectedBarber === index && (
                    <>
                      {/* Main spotlight layer - narrower and positioned below */}
                      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ overflow: 'visible' }}>
                        <div
                          className="absolute left-1/2 -translate-x-1/2"
                          style={{
                            width: '180%',
                            height: '250%',
                            bottom: '-15%',
                            background: "radial-gradient(ellipse 80% 55% at 50% 100%, rgba(51,255,0,0.35) 0%, rgba(51,255,0,0.22) 15%, rgba(51,255,0,0.12) 30%, rgba(51,255,0,0.05) 50%, rgba(51,255,0,0) 75%)",
                            filter: "blur(18px)",
                          }}
                        />
                      </div>
                      {/* Secondary glow layer - even narrower */}
                      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ overflow: 'visible' }}>
                        <div
                          className="absolute left-1/2 -translate-x-1/2"
                          style={{
                            width: '140%',
                            height: '200%',
                            bottom: '-10%',
                            background: "radial-gradient(ellipse 70% 45% at 50% 100%, rgba(51,255,0,0.3) 0%, rgba(51,255,0,0.18) 25%, rgba(51,255,0,0.08) 45%, rgba(51,255,0,0) 70%)",
                            filter: "blur(10px)",
                          }}
                        />
                      </div>
                    </>
                  )}
                </button>
              );
            })}

            {/* Right spacer untuk centering item terakhir */}
            <div className="flex-shrink-0" style={{ width: 'calc(50vw - 150px)' }}></div>
          </div>

          {/* NEXT AVAILABLE TIME */}
          <p className="text-stone-400 text-sm md:text-base text-center mb-6">
            Next Available XXXX
          </p>

          {/* MAIN PREVIEW IMAGE */}
          <div
            ref={previewImageRef}
            className="max-w-xs md:max-w-sm mx-auto mb-2 overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={galleryBarbers[selectedBarber].image}
              alt={galleryBarbers[selectedBarber].name}
              className="w-full object-cover"
            />
          </div>

          {/* INSTAGRAM HANDLE */}
          <p className="text-stone-400 text-sm md:text-base text-center mb-6">
            [@{galleryBarbers[selectedBarber].name.toLowerCase()}.blendz_]
          </p>

          {/* GREEN DIVIDER LINE */}
          <div className="w-full max-w-screen-md mx-auto mb-8">
            <div className="h-[2px] bg-[#33FF00]"></div>
          </div>

          {/* THUMBNAIL GRID (3 columns) */}
          <div className="max-w-screen-md mx-auto grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-12">
            {galleryBarbers.map((barber, index) => (
              <div
                key={index}
                onClick={(e) => handleThumbnailClick(index, e)}
                className={`aspect-square overflow-hidden rounded-lg bg-stone-800 transition-all duration-200 cursor-pointer ${
                  selectedBarber === index
                    ? "ring-4 ring-[#33FF00] scale-95"
                    : "hover:opacity-80 hover:scale-105"
                }`}
              >
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* CALL TO ACTION BUTTON */}
          <div className="flex justify-center">
            <Link to={generateLink()}>
              <Button
                className="border border-[#33FF00] px-8 md:px-12 py-6 md:py-8 text-lg md:text-2xl font-bold font-poppins rounded-full transform hover:scale-110 transition-transform duration-200 ease-in-out hover:bg-[#33FF00] hover:shadow-md hover:text-black hover:shadow-[#44813a]"
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* OLD CTA - VIEW BARBER PROFILE (Commented out) */}
          {/* <div className="flex justify-center">
            <Link
              to={galleryBarbers[selectedBarber].landing
                ? galleryBarbers[selectedBarber].link
                : generateLink()}
            >
              <Button
                className="border border-[#33FF00] px-8 md:px-12 py-6 md:py-8 text-lg md:text-2xl font-bold font-poppins rounded-full transform hover:scale-110 transition-transform duration-200 ease-in-out hover:bg-[#33FF00] hover:shadow-md hover:text-black hover:shadow-[#44813a]"
              >
                VIEW {galleryBarbers[selectedBarber].name}'S PROFILE
              </Button>
            </Link>
          </div> */}

        </div>
      </section>
    </Layout>
  );
}

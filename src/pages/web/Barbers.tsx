import Layout from "@/components/web/WebLayout";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import BgHero2 from "@/assets/web/home/hero.svg";

// Preview images (for large preview)
import Amir from "@/assets/web/barbers/amir.png";
import Rayhan from "@/assets/web/barbers/rayhan.png";
import Jay from "@/assets/web/barbers/jay.png";
import Emman from "@/assets/web/barbers/emman.png";
import Josh from "@/assets/web/barbers/josh.png";
import Niko from "@/assets/web/barbers/niko.png";
import Noah from "@/assets/web/barbers/noah.png";
import Lucas from "@/assets/web/barbers/lucas.png";
import Can from "@/assets/web/barbers/can.png";

// Gallery images (for grid thumbnails)
import AmirGallery from "@/assets/web/barbers/barbers-gallery/amir.png";
import RayhanGallery from "@/assets/web/barbers/barbers-gallery/rayhan.png";
import JayGallery from "@/assets/web/barbers/barbers-gallery/jay.png";
import EmmanGallery from "@/assets/web/barbers/barbers-gallery/emman.png";
import JoshGallery from "@/assets/web/barbers/barbers-gallery/josh.png";
import NikoGallery from "@/assets/web/barbers/barbers-gallery/niko.png";
import NoahGallery from "@/assets/web/barbers/barbers-gallery/noah.png";
import LucasGallery from "@/assets/web/barbers/barbers-gallery/lucas.png";
import CanGallery from "@/assets/web/barbers/barbers-gallery/can.png";

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

  // const generateLink = () => {
  //   const squareLink: string =
  //     "https://book.squareup.com/appointments/ud9yhcwfqc1fg0/location/LY7BZ89WAQ2QS/services";

  //   let bookLink: string;
  //   const parts = location.pathname.split("/");
  //   if (parts[1] === "meta") {
  //     bookLink = `/meta/book/services`;
  //   } else {
  //     bookLink = "/book/services";
  //   }

  //   const customize: boolean = true;
  //   if (customize) {
  //     return bookLink;
  //   } else {
  //     return squareLink;
  //   }
  // };

  const barberSvgs = [
    {
      svg: Amir,
      thumbnail: AmirGallery,
      link: generateRoute("/amir"),
      landing: true,
    },
    {
      svg: Lucas,
      thumbnail: LucasGallery,
      link: generateRoute("/lucas"),
      landing: true,
    },
    {
      svg: Can,
      thumbnail: CanGallery,
      link: generateRoute("/can"),
      landing: true,
    },
    {
      svg: Rayhan,
      thumbnail: RayhanGallery,
      link: generateRoute("/rayhan"),
      landing: true,
    },
    {
      svg: Josh,
      thumbnail: JoshGallery,
      link: generateRoute("/josh"),
      landing: true,
    },
    {
      svg: Noah,
      thumbnail: NoahGallery,
      link: generateRoute("/noah"),
      landing: true,
    },
    {
      svg: Jay,
      thumbnail: JayGallery,
      link: generateRoute("/jay"),
      landing: true,
    },
    {
      svg: Emman,
      thumbnail: EmmanGallery,
      link: generateRoute("/emman"),
      landing: true,
    },
    {
      svg: Niko,
      thumbnail: NikoGallery,
      link: generateRoute("/niko"),
      landing: true,
    },
  ];

  // Transform barberSvgs into gallery-friendly format
  const galleryBarbers = barberSvgs.map((barber, index) => ({
    image: barber.svg, // For preview/placeholder
    thumbnail: barber.thumbnail, // For grid thumbnails
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

      <section className="relative z-20 w-full flex flex-col justify-center md:max-w-screen-xl mx-auto pt-4 md:pt-8 pb-[-4rem] md:pb-[4rem]">
        <div className="container mx-auto px-2 md:px-8 scale-75 md:scale-100 origin-top">

          {/* BARBER NAME CAROUSEL HEADER */}
          <div
            ref={carouselRef}
            className="relative flex overflow-x-auto overflow-y-hidden gap-2 md:gap-4 items-center mb-6 md:mb-8 pt-2 pb-[5px] scrollbar-hide px-2 md:px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Left spacer untuk centering item pertama */}
            <div className="flex-shrink-0" style={{ width: 'calc(50vw - 150px)' }}></div>

            {galleryBarbers.map((barber, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleNameClick(index)}
                  className={`relative flex-shrink-0 flex flex-col items-center gap-1 md:gap-2 px-3 md:px-6 py-1 transition-all duration-500 cursor-pointer ${
                    selectedBarber === index
                      ? "text-[#33FF00]"
                      : "text-stone-500"
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className={`w-20 h-20 md:w-32 md:h-32 rounded-md overflow-hidden ${
                    selectedBarber === index
                      ? "ring-2 ring-[#33FF00]"
                      : ""
                  }`}>
                    <img
                      src={barber.thumbnail}
                      alt={barber.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Barber Name with underline wrapper */}
                  <div className="relative pb-0">
                    <span className="text-lg md:text-4xl font-bold font-poppins whitespace-nowrap">
                      {barber.name}
                    </span>

                    {/* GREEN UNDERLINE for active */}
                    {selectedBarber === index && (
                      <div className="absolute bottom-[-8px] md:bottom-[-12px] left-0 right-0 h-[2px] md:h-[4px] bg-[#33FF00]"></div>
                    )}
                  </div>

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

          {/* MAIN PREVIEW IMAGE */}
          <div
            ref={previewImageRef}
            className="max-w-[240px] md:max-w-sm mx-auto mb-4 md:mb-8 overflow-hidden rounded-xl shadow-lg aspect-[0.7]"
          >
            <img
              key={selectedBarber}
              src={galleryBarbers[selectedBarber].image}
              alt={galleryBarbers[selectedBarber].name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* GREEN DIVIDER LINE WITH CTA BUTTON */}
          <div className="w-full max-w-screen-md mx-auto mb-4 md:mb-6 relative flex items-center justify-center">
            <div className="absolute w-full h-[2px] bg-[#33FF00]"></div>
            <div className="relative z-10 px-4 bg-black">
              <Link to={`${generateRoute(`/${galleryBarbers[selectedBarber].name.toLowerCase()}/book/services`)}`}>
                <Button
                  className="bg-[#454545] text-[#33FF00] border border-[#33FF00] px-6 md:px-12 py-5 md:py-8 text-base md:text-2xl font-bold font-poppins rounded-full transform hover:scale-110 transition-transform duration-200 ease-in-out hover:bg-[#33FF00] hover:shadow-md hover:text-black hover:shadow-[#44813a]"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>

          {/* THUMBNAIL GRID (3 columns) */}
          <div className="max-w-screen-md mx-auto relative px-1 md:px-0">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-9">
              {galleryBarbers.map((barber, index) => (
                <div
                  key={index}
                  onClick={(e) => handleThumbnailClick(index, e)}
                  className={`aspect-square overflow-hidden rounded-md md:rounded-lg transition-all duration-200 cursor-pointer relative ${
                    selectedBarber === index
                      ? "ring-2 md:ring-4 ring-[#33FF00] scale-100"
                      : "hover:opacity-80 hover:scale-105"
                  }`}
                >
                <img
                  src={barber.thumbnail}
                  alt={barber.name}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
                {/* Barber name box - bottom left corner */}
                {/* <div className="absolute bottom-0 left-0 bg-black/85 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-br-none rounded-tl-none rounded-tr-md border border-[#33FF00]/30">
                  <p className="text-white text-xs md:text-sm font-bold font-poppins">
                    {barber.name}
                  </p>
                </div> */}
              </div>
              ))}
            </div>

            {/* Grid Pattern Divider Lines */}
            {/* Vertical line between column 1 and 2 */}
            <div className="absolute top-0 left-[33.33%] w-[1px] md:w-[2px] h-full bg-[#33FF00] pointer-events-none" style={{ transform: 'translateX(-0.5px)' }}></div>

            {/* Vertical line between column 2 and 3 */}
            <div className="absolute top-0 left-[66.66%] w-[1px] md:w-[2px] h-full bg-[#33FF00] pointer-events-none" style={{ transform: 'translateX(-0.5px)' }}></div>

            {/* Horizontal line after row 1 (33.33% down) */}
            <div className="absolute left-0 top-[33.33%] w-full h-[1px] md:h-[2px] bg-[#33FF00] pointer-events-none" style={{ transform: 'translateY(-0.5px)' }}></div>

            {/* Horizontal line after row 2 (66.66% down) */}
            <div className="absolute left-0 top-[66.66%] w-full h-[1px] md:h-[2px] bg-[#33FF00] pointer-events-none" style={{ transform: 'translateY(-0.5px)' }}></div>
          </div>

        </div>
      </section>
    </Layout>
  );
}

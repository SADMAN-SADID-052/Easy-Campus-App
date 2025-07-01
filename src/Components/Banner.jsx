import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const slides = [
    {
      img: "",
      title: "New Year Celebrations",
      subtitle: "Started on 25th July, 2025",
      tagline: "We Design Simple, Easy And Modern Themes"
    },
    {
      img: "https://img.freepik.com/premium-photo/smart-city-internet-technology-concept_31965-6911.jpg?ga=GA1.1.687432857.1714536364&semt=ais_hybrid&w=740",
      title: "Smart Control Room Solutions",
      subtitle: "Started on 12th Jan, 2016",
      tagline: "We Connect Cities and Technology"
    },
    {
      img: "https://img.freepik.com/premium-photo/innovated-building-architecture-inventive-engineering_31965-264421.jpg?ga=GA1.1.687432857.1714536364&semt=ais_hybrid&w=740",
      title: "Efficiency in Engineering",
      subtitle: "Started on 1st Mar, 2017",
      tagline: "Simplicity Meets Functionality"
    },
    {
      img: "https://img.freepik.com/free-photo/man-holding-smartphone-with-apartment-buildings-hologram_23-2149369107.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
      title: "Smart City with Holographic Tech",
      subtitle: "Started on 10th Nov, 2018",
      tagline: "Modernizing Urban Experiences"
    },
  ];

  return (
    <div className="">
      <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false} showStatus={false}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide.img} className="object-cover h-[600px] w-full" alt={slide.title} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col justify-center items-center text-center px-4">
              <p className="text-white text-sm md:text-lg font-semibold mb-2 uppercase tracking-wide">
                {slide.subtitle}
              </p>
              <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-4">
                {slide.title}
              </h2>
              <hr className="border-white w-24 mb-4" />
              <p className="text-white text-lg md:text-xl font-medium mb-6">
                {slide.tagline}
              </p>
              <div className="flex gap-4">
                <button className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition font-semibold">
                  SUBSCRIBE
                </button>
                <button className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition font-semibold">
                  TAKE THE TOUR
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;

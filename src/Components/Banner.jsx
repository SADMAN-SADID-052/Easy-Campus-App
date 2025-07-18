import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const slides = [
    {
      img: "https://plus.unsplash.com/premium_photo-1730658556676-bcf03b6f38e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGFoYWthJTIwQ2l0eSUyMENvbGxlZ2V8ZW58MHx8MHx8fDA%3D",
      title: "Dhaka City College",
      subtitle: "Admission on 17th July, 2025",
      tagline: "Learn More"
    },
    {
      img: "https://media.istockphoto.com/id/620981310/photo/bangladesh-dhaka.webp?a=1&b=1&s=612x612&w=0&k=20&c=8AxznaMsAIR_MeRxeJVqUI_zb013c89o9UKOdbEjmJg=",
      title: "Dhaka Science College, Dhaka",
      subtitle: "Admission on 18th July, 2025",
      tagline: "Join And Enjoy"
    },
    {
      img: "https://images.unsplash.com/photo-1597234670730-93ef4628e124?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TW9oYW1tYWRwdXIlMjBHb3Zlcm5tZW50JTIwQ29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Mohammadpur Govt. College",
      subtitle: "Admission on 19st August, 2025",
      tagline: "Join And Enjoy"
    },
    {
      img: "https://images.unsplash.com/photo-1626964143945-b13d22dfe399?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QmFuZ2xhJTIwQ29sbGVnZSUyQyUyMERoYWthfGVufDB8fDB8fHwwd",
      title: "Dhaka Bangla College",
      subtitle: "Admission on 20th August, 2025",
      tagline: "Join And Enjoy"
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

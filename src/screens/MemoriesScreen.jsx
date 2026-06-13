import { useState, useEffect } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const memories = [
  {
    image: "/photos/IMG_1117.JPG",
    caption: "Memory 1",
  },
  {
    image: "/photos/IMG_1120.JPG",
    caption: "Memory 2",
  },
  {
    image: "/photos/IMG_1785.JPG",
    caption: "Memory 3",
  },
  {
    image: "/photos/IMG_1840.JPG",
    caption: "Memory 4",
  },
  {
    image: "/photos/IMG_1846.JPG",
    caption: "Memory 5",
  },
  {
    image: "/photos/IMG_7001.JPEG",
    caption: "Memory 6",
  },
  {
    image: "/photos/IMG_7424.JPG",
    caption: "Memory 7",
  },
  {
    image: "/photos/IMG_7426.JPG",
    caption: "Memory 8",
  },
  {
    image: "/photos/IMG_7484.JPEG",
    caption: "Memory 9",
  },
  {
    image: "/photos/IMG_7485.JPEG",
    caption: "Memory 10",
  },
  {
    image: "/photos/IMG_7670.JPG",
    caption: "Memory 11",
  },
  {
    image: "/photos/IMG_7681.JPG",
    caption: "Memory 12",
  },
];

// Shuffle memories array using Fisher-Yates algorithm
const shuffledMemories = [...memories];
for (let i = shuffledMemories.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffledMemories[i], shuffledMemories[j]] = [shuffledMemories[j], shuffledMemories[i]];
}

export default function MemoriesScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % shuffledMemories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + shuffledMemories.length) % shuffledMemories.length);
  };

  // Autoplay slideshow every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen relative flex flex-col px-6 py-8"
      style={{
        backgroundColor: "#101415",
        backgroundImage: "radial-gradient(circle at 50% 30%, #1d1633 0%, transparent 60%)",
      }}
    >
      {/* Main Header */}
      <div className="text-center mb-8">
        <h1
          className="font-display text-3xl font-bold mb-3"
          style={{
            color: "#ffffff",
            letterSpacing: "0.02em",
          }}
        >
          Our Favorite Memories
        </h1>
        <div className="flex justify-center">
          <Sparkles size={20} style={{ color: "#d0bcff" }} />
        </div>
      </div>

      {/* Featured Slideshow Card */}
      <div className="relative mb-8">
        <div
          className="rounded-[40px] overflow-hidden relative"
          style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <img
            src={shuffledMemories[currentSlide].image}
            alt={shuffledMemories[currentSlide].caption}
            className="w-full h-[400px] object-cover"
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
            {shuffledMemories.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentSlide ? "#d0bcff" : "rgba(255, 255, 255, 0.3)",
                  width: index === currentSlide ? "8px" : "6px",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div
        className="p-6 rounded-2xl mb-8 relative"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      >
        <Quote
          size={32}
          className="absolute top-4 left-4 opacity-20"
          style={{ color: "#d0bcff" }}
        />
        <p
          className="font-body text-center italic text-lg leading-relaxed"
          style={{ color: "#e1e3e3" }}
        >
          "I compare you, my love, to a mare among Pharoah's chariots. Your cheeks are lovely with ornaments, your eyes are doves."
        </p>
        <div className="flex justify-center mt-4">
          <Sparkles size={16} style={{ color: "#d0bcff" }} />
        </div>
      </div>
    </div>
  );
}

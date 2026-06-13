import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Calendar, MapPin, Heart, Play } from "lucide-react";

export default function SuccessScreen({ onGoToMemories }) {
  const confettiTriggered = useRef(false);

  useEffect(() => {
    if (!confettiTriggered.current) {
      confettiTriggered.current = true;

      // Confetti particle system with specified colors
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const colors = ["#d0bcff", "#381e72", "#ffffff"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 90,
          spread: 70,
          origin: { x: Math.random(), y: -0.1 },
          colors: colors,
          gravity: 0.8,
          scalar: 1.2,
          drift: 0,
          ticks: 100,
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes throb {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 20px rgba(208, 188, 255, 0.4);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 30px rgba(208, 188, 255, 0.6);
            }
          }
        `}
      </style>
      <div
        className="min-h-screen relative flex flex-col items-center justify-center px-6 py-8 overflow-hidden"
        style={{
          backgroundColor: "#101415",
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(120, 81, 255, 0.15) 0%, transparent 50%)",
        }}
      >
      {/* Status Badge */}
      <div className="mb-6 z-10">
        <div
          className="px-6 py-2 rounded-full text-white font-body text-sm font-semibold tracking-wider"
          style={{
            background: "linear-gradient(135deg, #7e51ff 0%, #b085ff 100%)",
          }}
        >
          ✨ IT'S OFFICIAL ✨
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-8 z-10">
        <h1
          className="font-display text-5xl font-bold mb-3"
          style={{ color: "#e1e3e3" }}
        >
          Yay! She said Yes!
        </h1>
        <p
          className="font-body text-lg italic"
          style={{ color: "#e1e3e3" }}
        >
          A new chapter begins together...
        </p>
      </div>

      {/* Main Hero Image */}
      <div className="relative w-full max-w-md mb-8 z-10">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
        >
          <img
            src="/photos/IMG_7426.JPG?w=600&h=500&fit=crop"
            alt="Couple Portrait"
            className="w-full h-[400px] object-cover"
          />

          {/* Forever & Always Badge */}
          <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg backdrop-blur-md bg-black/30">
            <span className="font-body text-white text-sm font-medium">Forever & Always</span>
          </div>

          {/* Heart Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Heart size={20} className="text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onGoToMemories}
        className="w-full max-w-md py-4 rounded-full font-body font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 hover:shadow-lg"
        style={{
          backgroundColor: "#d0bcff",
          color: "#101415",
          boxShadow: "0 0 20px rgba(208, 188, 255, 0.4)",
          animation: "throb 2s ease-in-out infinite",
        }}
      >
        <Play size={20} />
        View Our Memories
      </button>

      {/* Information Cards */}
      <div className="flex gap-4 w-full max-w-md mt-6 z-10">
        {/* Date Card */}
        <div
          className="flex-1 p-4 rounded-2xl backdrop-blur-md flex items-center gap-3"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <Calendar size={20} style={{ color: "#d0bcff" }} />
          <div>
            <p className="font-body text-xs" style={{ color: "#e1e3e3", opacity: 0.7 }}>
              The Date
            </p>
            <p className="font-body text-sm font-medium" style={{ color: "#e1e3e3" }}>
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Location Card */}
        <div
          className="flex-1 p-4 rounded-2xl backdrop-blur-md flex items-center gap-3"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <MapPin size={20} style={{ color: "#d0bcff" }} />
          <div>
            <p className="font-body text-xs" style={{ color: "#e1e3e3", opacity: 0.7 }}>
              The Location
            </p>
            <p className="font-body text-sm font-medium" style={{ color: "#e1e3e3" }}>
              Jersey City, USA
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

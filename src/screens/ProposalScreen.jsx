import { useState, useEffect } from "react";
import { Heart, MoreVertical, Sparkles, Home } from "lucide-react";
import FloatingStars from "../components/FloatingStars";

export default function ProposalScreen({ onYes, onNo, noCount }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleNoClick = () => {
    onNo();

    // Calculate safe boundaries within the viewport
    const maxOffset = 150;
    const safeTop = Math.random() * maxOffset * 2 - maxOffset;
    const safeLeft = Math.random() * maxOffset * 2 - maxOffset;

    setPosition({
      top: safeTop,
      left: safeLeft,
    });
  };

  const handleYesClick = () => {
    setShowSuccess(true);
    onYes();
  };

  const yesScale = 1 + noCount * 0.2;

  // Floating hearts effect
  useEffect(() => {
    const heartIcons = [
      <Heart key="heart" />,
      <Heart key="heart-border" />,
      <Sparkles key="sparkle" />,
    ];

    const createHeart = () => {
      const heart = {
        id: Date.now() + Math.random(),
        icon: heartIcons[Math.floor(Math.random() * heartIcons.length)],
        left: Math.random() * 100,
        size: Math.random() * 20 + 20,
        duration: Math.random() * 3 + 4,
        filled: Math.random() > 0.5,
      };

      setHearts((prev) => [...prev, heart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id));
      }, 7000);
    };

    const interval = setInterval(createHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface text-text flex flex-col overflow-hidden relative">
      {/* <FloatingStars /> */}

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart text-lavender/40 absolute"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            {heart.icon}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-32 max-w-4xl mx-auto relative z-10 w-full">
        {/* Hero Section */}
        <div
          className={`w-full text-center mb-8 transition-all duration-500 ${showSuccess ? "scale-90 opacity-0" : ""}`}
        >
          <div className="bg-white p-4 rounded-2xl rotate-[-4deg] shadow-2xl max-w-md z-10">
            <video
              src="/videos/IMG_1622.MOV"
              alt="First date"
              className="rounded-xl w-full h-80 object-cover"
              autoPlay
              muted
              loop
              playsInline
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop";
              }}
            />
            <p className="text-center text-gray-700 mt-3 font-body text-base">
              Our first date
            </p>
          </div>
          {/* Headline */}
          <h1 className="font-display text-4xl font-bold text-center mt-8 z-10 leading-tight">
            Will you be my girlfriend?
          </h1>
        </div>

        {/* Action Buttons */}
        {!showSuccess && (
          <div className="flex flex-col items-center gap-6 w-full relative h-[150px]">
            <button
              onClick={handleYesClick}
              style={{
                transform: `scale(${yesScale})`,
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className="z-20 w-full max-w-[280px] bg-lavender hover:bg-lavender-fixed text-on-lavender py-5 px-10 rounded-full font-semibold shadow-[0_10px_30px_rgba(208,188,255,0.3)] flex items-center justify-center gap-3 origin-center"
            >
              <Heart size={20} className="fill-on-lavender" />
              Yes!
            </button>

            <button
              onClick={handleNoClick}
              style={{
                position: "relative",
                top: position.top,
                left: position.left,
                transition: "all 0.3s ease",
              }}
              className="z-10 px-8 py-3 rounded-full border-2 border-outline text-outline font-medium transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              No
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

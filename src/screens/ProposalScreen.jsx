import { useState } from "react";
import { Heart, MoreVertical } from "lucide-react";
import FloatingStars from "../components/FloatingStars";

export default function ProposalScreen({ onYes, onNo, noCount }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleNoClick = () => {
    onNo();
    
    // Calculate safe boundaries within the viewport
    const maxOffset = 150; // Maximum pixels to move in any direction
    const safeTop = Math.random() * maxOffset * 2 - maxOffset;
    const safeLeft = Math.random() * maxOffset * 2 - maxOffset;
    
    setPosition({
      top: safeTop,
      left: safeLeft,
    });
  };

  const yesScale = 1 + noCount * 0.2;

  return (
    <div className="min-h-screen bg-surface text-text flex flex-col items-center justify-between px-6 pb-safe overflow-hidden relative">
      <FloatingStars />

      {/* Top Bar */}
      <div className="w-full flex justify-between items-center py-6 z-10">
        <div className="flex items-center gap-2">
          <Heart size={20} className="text-lavender fill-lavender" />
          <span className="font-body font-medium">Our Love Story</span>
        </div>
        <MoreVertical size={24} className="text-text/60" />
      </div>

      {/* Hero Image */}
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
            e.target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop";
          }}
        />
        <p className="text-center text-gray-700 mt-3 font-body text-base">
          Our first date 
        </p>
      </div>

      {/* Headline */}
      <h1 className="font-display text-4xl font-bold text-center z-10 leading-tight">
        Will you be my girlfriend?
      </h1>

      {/* CTA Buttons */}
      <div className="flex flex-col items-center gap-4 z-10 w-full max-w-md">
        <button
          onClick={onYes}
          style={{
            transform: `scale(${yesScale})`,
          }}
          className="h-14 px-10 rounded-full bg-lavender text-black font-semibold shadow-[0_0_20px_rgba(208,188,255,0.3)] transition-all duration-300 w-full flex items-center justify-center gap-2"
        >
          <Heart size={20} className="fill-black" />
          Yes!
        </button>

        <button
          onClick={handleNoClick}
          style={{
            position: "relative",
            top: position.top,
            left: position.left,
          }}
          className="rounded-full border border-danger px-8 py-3 text-danger transition-all font-medium"
        >
          No
        </button>
      </div>
    </div>
  );
}

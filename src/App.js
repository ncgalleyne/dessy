import { useState } from "react";
import confetti from "canvas-confetti";
import ProposalScreen from "./screens/ProposalScreen";
import SuccessScreen from "./screens/SuccessScreen";
import MemoriesScreen from "./screens/MemoriesScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("proposal");
  const [noCount, setNoCount] = useState(0);

  const handleYes = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#d0bcff", "#381e72", "#ffffff"],
    });
    setCurrentScreen("success");
  };

  const handleNo = () => {
    setNoCount((prev) => prev + 1);
  };

  const goToMemories = () => {
    setCurrentScreen("memories");
  };

  if (currentScreen === "success") {
    return <SuccessScreen onGoToMemories={goToMemories} />;
  }

  if (currentScreen === "memories") {
    return <MemoriesScreen />;
  }

  return (
    <ProposalScreen onYes={handleYes} onNo={handleNo} noCount={noCount} />
  );
}

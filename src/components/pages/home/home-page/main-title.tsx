import CursorBlinker from "@/components/shared/cursor-blinker/cursor-blinker";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function MainTitle() {
  const textIndex = useMotionValue(0);
  const texts = ["music key", "tempo", "harmonique"];
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      duration: 1.5,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <h1 className="text-4xl md:text-7xl relative">
      <span className="relative z-10">
        <strong>Find</strong> songs by
        <span className="absolute h-6 w-12 bg-brand bottom-1 -left-5 -z-10"></span>
      </span>{" "}
      <br />
      <motion.strong>{displayText}</motion.strong>
      <CursorBlinker />
    </h1>
  );
}

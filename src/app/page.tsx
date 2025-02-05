"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Surprise from "./util/confetti";
import { cn } from "./util/cn";
import useSound from "use-sound";

export default function Home() {
  const [image, setImage] = useState(false);
  const [coords, setCoords] = useState<{ top: string; left: string } | null>(
    null
  );
  const [response, setResponse] = useState("No");
  const [firstHover, setFirstHover] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [play] = useSound("/audio.mp3", { volume: 0.05, loop: true });
  const [playYippee, { stop }] = useSound("/yippee.mp3", {
    volume: 0.05,
    loop: true,
  });

  useEffect(() => {
    if (hasInteracted) {
      play();
    }
  }, [hasInteracted, play]);

  const phrases = useMemo(
    () => [
      "Wrong button ❌",
      "Are you sure 🤔?",
      "You're breaking my heart 💔",
      "Pwetty please 🥺👉👈",
      "Can't catch up? 😂",
      "Think again 🤨",
      "But why? 😢",
      "Ouch, that hurts 💔",
      "You sure about that? 🤔",
      "What if I cry? 😭",
      "Rethink your choices 🤭",
      "You wouldn’t dare! 😱",
      "I'll tell your mom 😤",
      "Is this a mistake? 👀",
      "Try another answer 😏",
      "I’ll give you chocolate 🍫",
      "Heartbroken 💀",
      "No escape! 😈",
      "Last chance! 🚨",
      "Cold as ice 🥶",
      "You're making history 📜",
      "Plot twist? 😳",
      "Even the AI is sad now 🤖💔",
      "Don’t break my code! 💻😭",
    ],
    []
  );

  const handleNoBtn = () => {
    const x = Math.random() * 70; // Keep within safe bounds
    const y = Math.random() * 70;

    setFirstHover(true);
    setCoords({ top: `${x}%`, left: `${y}%` });
    setResponse(phrases[Math.floor(Math.random() * phrases.length)]);
  };

  const handleYesBtn = () => setImage((prev) => !prev);

  const handleYesClick = () => {
    setSuccess(true);
    playYippee();
    setTimeout(() => {
      stop();
    }, 3000);
  };

  return (
    <div
      className={cn(
        "w-full min-h-screen flex items-center justify-center",
        success ? "bg-pink-300" : "bg-pink-200"
      )}
      onClick={() => setHasInteracted(true)}
    >
      <section className="flex flex-col items-center justify-center h-full container mx-auto px-4 sm:px-10 overflow-hidden">
        {success ? (
          <>
            <Surprise />
            <div className="relative w-full aspect-video max-w-[500px]">
              <Image
                src="/celebrate.gif"
                alt="two animals holding hearts and smiling gif"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-red-500 font-bold text-3xl md:text-4xl text-center mt-10">
              💖 Yipee! 💖
            </p>
          </>
        ) : (
          <>
            <p className="text-red-500 font-bold text-3xl md:text-4xl text-center">
              Name Here
            </p>
            <p className="text-red-500 font-bold text-3xl md:text-4xl text-center">
              ♡ Will you be my Valentine? ♡
            </p>
            <div className="relative w-full aspect-video max-w-[500px] my-10">
              <Image
                src={image ? "/happi.gif" : "/please.gif"}
                alt="two animals asking each other to be their valentine gif"
                fill
                style={{ objectFit: "contain" }}
                className={image ? "-translate-x-9" : ""}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-5 py-2 bg-white border-2 border-green-500 text-green-500 font-semibold rounded-full transition duration-300 hover:bg-green-500 hover:text-white"
                onMouseEnter={handleYesBtn}
                onMouseLeave={handleYesBtn}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                className={cn(
                  "px-5 py-2 bg-white border-2 border-red-500 text-red-500 font-semibold rounded-full transition duration-300 hover:bg-red-500 hover:text-white",
                  firstHover ? "absolute" : ""
                )}
                style={coords || { top: "50%", left: "50%" }}
                onClick={handleNoBtn}
                onMouseEnter={handleNoBtn}
              >
                {response}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

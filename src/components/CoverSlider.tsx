"use client";

import { useEffect, useState } from "react";

interface Props {
  urls: string[];
}

export default function CoverSlider({ urls }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (urls.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % urls.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [urls.length]);

  if (urls.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden" style={{ maxHeight: 260 }}>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {urls.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={url}
            alt=""
            className="w-full flex-shrink-0 object-cover"
            style={{ maxHeight: 260 }}
          />
        ))}
      </div>

      {urls.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {urls.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

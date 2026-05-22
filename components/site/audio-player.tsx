"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

type Track = {
  title: string;
  subtitle: string;
  src: string;
  meta: string;
  description: string;
  duration: number;
};

const TRACKS: Track[] = [
  {
    title: "Расслабление и заземление",
    subtitle: "Муладхара · Анахата",
    src: "/universal_grounding_wave_checkup_136hz_4hz.wav",
    meta: "136.1 Гц · бинаураль 4 Гц",
    description:
      "Снимает нервное напряжение, заземляет, снижает внутреннюю спешку, готовит к доверию и восприятию чекапа.",
    duration: 300,
  },
  {
    title: "Снижение тревоги",
    subtitle: "Универсальный трек",
    src: "/universal_anxiety_reduction_wave_track.wav",
    meta: "174 / 180 Гц · бинаураль 6 Гц",
    description:
      "Успокоение, заземление и снижение внутренней спешки. Слушать в наушниках, удерживая внимание на стопах и выдохе.",
    duration: 300,
  },
  {
    title: "Контакт с собой",
    subtitle: "Свадхистана · Анахата · Аджна",
    src: "/universal_self_contact_track.wav",
    meta: "174 / 136.1 / 432 / 528 Гц · тета 6 Гц",
    description:
      "Мягкое возвращение внимания из внешнего шума к телу, дыханию и внутренней опоре. Перед чекапом или самонаблюдением.",
    duration: 300,
  },
  {
    title: "Восстановление ресурса",
    subtitle: "Универсальная опора",
    src: "/universal_resource_restoration_783hz_binaural.wav",
    meta: "7.83 Гц Шуман · 174 / 285 / 432 Гц",
    description:
      "Расслабление после перегруза, мягкое возвращение в тело, подготовка к практике. 7 спокойных выдохов перед началом.",
    duration: 360,
  },
];

const formatTime = (s: number): string => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const AudioPlayer = (): React.ReactElement => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0].duration);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = TRACKS[active];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = (): void => setCurrentTime(audio.currentTime);
    const onMeta = (): void => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };
    const onEnd = (): void => {
      setPlaying(false);
      setCurrentTime(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, [active]);

  const toggle = (): void => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play();
      setPlaying(true);
    }
  };

  const selectTrack = (i: number): void => {
    if (i === active) return;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setActive(i);
    setCurrentTime(0);
    setDuration(TRACKS[i].duration);
    setPlaying(false);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>): void => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const progress = duration ? currentTime / duration : 0;

  return (
    <div className="glass-strong shadow-soft-lg rounded-3xl p-6 sm:p-8 md:p-10">
      <audio ref={audioRef} src={track.src} preload="metadata" />

      <div className="flex items-center gap-5 sm:gap-7">
        <button
          onClick={toggle}
          aria-label={playing ? "Пауза" : "Воспроизвести"}
          className="group flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-all duration-500 hover:bg-clay-deep hover:scale-105"
        >
          {playing ? (
            <Pause className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
          ) : (
            <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" strokeWidth={1.5} />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <div className="font-serif text-xl sm:text-2xl text-ink leading-tight">{track.title}</div>
          <div className="mt-0.5 text-sm text-muted">{track.subtitle}</div>
          <div
            onClick={seek}
            className="mt-4 cursor-pointer py-2"
            role="slider"
            aria-valuenow={Math.round(progress * 100)}
          >
            <div className="relative h-0.5 overflow-hidden rounded-full bg-line">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-clay-deep transition-[width] duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs tabular-nums text-muted">
            <span>{formatTime(currentTime)}</span>
            <span className="text-[11px] uppercase tracking-wider text-clay-deep">{track.meta}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-soft border-t border-line/60 pt-5">
        {track.description}
      </p>

      <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TRACKS.map((t, i) => (
          <button
            key={t.src}
            onClick={() => selectTrack(i)}
            className={`rounded-2xl border px-4 py-3 text-left transition-all duration-400 ${
              i === active
                ? "border-clay bg-cream-soft"
                : "border-line/60 bg-transparent hover:border-clay/60 hover:bg-cream-soft/50"
            }`}
          >
            <div className="font-serif text-base text-ink leading-tight">{t.title}</div>
            <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">{t.subtitle}</div>
          </button>
        ))}
      </div>

      <p className="mt-5 text-[11px] text-muted/80 leading-relaxed">
        Слушайте в наушниках на комфортной громкости. Не используйте за рулём и в ситуациях,
        где нужна повышенная концентрация. Трек не является медицинским средством и не заменяет
        помощь специалиста.
      </p>
    </div>
  );
};

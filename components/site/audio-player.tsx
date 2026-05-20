"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

type Track = {
  title: string;
  subtitle: string;
  /** Base frequency in Hz for the synthesized pad (Web Audio fallback when no real file). */
  tone: number;
  duration: number;
};

const TRACKS: Track[] = [
  { title: "Тишина", subtitle: "Расслабление и заземление", tone: 174, duration: 240 },
  { title: "Возвращение", subtitle: "Восстановление ресурса", tone: 285, duration: 300 },
  { title: "Мягкая опора", subtitle: "Снижение тревоги", tone: 396, duration: 270 },
  { title: "Контакт", subtitle: "Контакт с собой", tone: 528, duration: 330 },
];

const formatTime = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const AudioPlayer = (): React.ReactElement => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode[]; gain: GainNode } | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  const track = TRACKS[active];

  const stopNodes = (): void => {
    if (nodesRef.current) {
      try {
        nodesRef.current.gain.gain.cancelScheduledValues(0);
        nodesRef.current.gain.gain.setTargetAtTime(0, ctxRef.current!.currentTime, 0.3);
        for (const osc of nodesRef.current.osc) {
          osc.stop(ctxRef.current!.currentTime + 0.5);
        }
      } catch {
        /* noop */
      }
      nodesRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const start = (): void => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") void ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);

    const oscs: OscillatorNode[] = [];
    for (const ratio of [1, 1.5, 2.005]) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = track.tone * ratio;
      const subGain = ctx.createGain();
      subGain.gain.value = ratio === 1 ? 0.7 : ratio === 1.5 ? 0.25 : 0.12;
      osc.connect(subGain).connect(gain);
      osc.start();
      oscs.push(osc);
    }

    nodesRef.current = { osc: oscs, gain };
    startRef.current = performance.now() / 1000 - offsetRef.current;

    const tick = (): void => {
      const elapsed = performance.now() / 1000 - startRef.current;
      offsetRef.current = elapsed;
      const pct = Math.min(elapsed / track.duration, 1);
      setProgress(pct);
      if (pct >= 1) {
        setPlaying(false);
        offsetRef.current = 0;
        setProgress(0);
        stopNodes();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const toggle = (): void => {
    if (playing) {
      stopNodes();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  };

  const selectTrack = (i: number): void => {
    stopNodes();
    offsetRef.current = 0;
    setProgress(0);
    setActive(i);
    setPlaying(false);
  };

  useEffect(() => stopNodes, []);

  return (
    <div className="glass-strong shadow-soft-lg rounded-3xl p-6 sm:p-8 md:p-10">
      <div className="flex items-center gap-5 sm:gap-7">
        <button
          onClick={toggle}
          aria-label={playing ? "Пауза" : "Воспроизвести"}
          className="group flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-all duration-500 hover:bg-clay-deep hover:scale-105"
        >
          {playing ? <Pause className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} /> : <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" strokeWidth={1.5} />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="font-serif text-xl sm:text-2xl text-ink">{track.title}</div>
          <div className="mt-0.5 text-sm text-muted">{track.subtitle}</div>
          <div className="mt-4 flex items-center gap-3">
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-clay-deep transition-[width] duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-muted whitespace-nowrap">
              {formatTime(progress * track.duration)} <span className="text-line">/</span> {formatTime(track.duration)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TRACKS.map((t, i) => (
          <button
            key={t.title}
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
    </div>
  );
};

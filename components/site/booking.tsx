"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ArrowRight, X, Check, Loader2 } from "lucide-react";

type BookingCtx = {
  open: (format?: string) => void;
};

const Ctx = createContext<BookingCtx | null>(null);

export const useBooking = (): BookingCtx => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
};

const FORMATS = ["Базовый — 5 000 ₽", "Глубокий — 10 000 ₽", "Сопровождение — 25 000 ₽", "Пока не выбрала"];
const CONTACT_PREF = ["Telegram", "WhatsApp", "Звонок"];

type Status = "idle" | "sending" | "ok" | "error";

export const BookingProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [isOpen, setOpen] = useState(false);
  const [format, setFormat] = useState<string>(FORMATS[3]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const open = useCallback((preset?: string) => {
    if (preset) setFormat(preset);
    setStatus("idle");
    setErrorMsg("");
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    if (status === "sending") return;
    setOpen(false);
  }, [status]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      contact: String(fd.get("contact") ?? "").trim(),
      pref: String(fd.get("pref") ?? ""),
      format: String(fd.get("format") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
      hp: String(fd.get("hp") ?? ""),
    };

    if (payload.hp) return;
    if (!payload.name || !payload.contact) {
      setStatus("error");
      setErrorMsg("Пожалуйста, оставьте имя и контакт.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Ошибка отправки");
      }
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Не получилось отправить. Попробуйте ещё раз.");
    }
  };

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          <button
            aria-label="Закрыть"
            onClick={close}
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm animate-fade-up"
            style={{ animationDuration: "0.4s" }}
          />
          <div
            className="relative w-full max-w-lg rounded-3xl bg-cream shadow-soft-lg border border-line/70 overflow-hidden animate-fade-up"
            style={{ animationDuration: "0.5s" }}
          >
            {/* soft top glow */}
            <div className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 rounded-full bg-sand/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cream-soft blur-3xl" />

            <button
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-5 top-5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line/70 bg-cream/80 text-ink-soft transition hover:border-clay hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="relative p-7 sm:p-9">
              {status === "ok" ? (
                <div className="text-center py-6">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream-soft border border-clay/40 text-clay-deep">
                    <Check className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h2 className="mt-6 font-serif text-3xl text-ink leading-tight">
                    Заявка принята
                  </h2>
                  <p className="mt-3 text-base text-ink-soft leading-relaxed">
                    Виктория свяжется с вами в ближайшее время —
                    <br />
                    в удобном для вас канале.
                  </p>
                  <button
                    onClick={close}
                    className="btn-ghost mt-8"
                  >
                    Закрыть
                  </button>
                </div>
              ) : (
                <>
                  <div className="eyebrow">Запись на чекап</div>
                  <h2 id="booking-title" className="mt-3 font-serif font-light text-3xl sm:text-[2.25rem] leading-[1.1] text-ink">
                    Оставьте контакт —<br />
                    <span className="italic text-clay-deep">я напишу первой</span>
                  </h2>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    Без обязательств. Просто познакомимся и подберём формат.
                  </p>

                  <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    <Field name="name" label="Как к вам обращаться" placeholder="Имя" required />
                    <Field name="contact" label="Telegram, WhatsApp или телефон" placeholder="@username или +7…" required />

                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-muted">Удобный канал связи</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {CONTACT_PREF.map((p, i) => (
                          <Radio key={p} name="pref" value={p} defaultChecked={i === 0} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.18em] text-muted">Формат</label>
                      <select
                        name="format"
                        defaultValue={format}
                        className="mt-2 w-full rounded-2xl border border-line bg-cream-soft/40 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-clay focus:bg-cream"
                      >
                        {FORMATS.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>

                    <Field
                      name="message"
                      label="Пара слов о состоянии — необязательно"
                      placeholder="Что сейчас отзывается важнее всего…"
                      textarea
                    />

                    {/* honeypot */}
                    <input
                      type="text"
                      name="hp"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {status === "error" && (
                      <p className="text-sm text-[#a5564f]">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary w-full !justify-center"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                          Отправляю
                        </>
                      ) : (
                        <>
                          Отправить заявку
                          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-muted text-center leading-relaxed">
                      Нажимая «Отправить», вы соглашаетесь на обработку контактных данных
                      исключительно для связи по заявке.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
};

const Field = ({
  name,
  label,
  placeholder,
  required,
  textarea,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}): React.ReactElement => (
  <div>
    <label htmlFor={name} className="text-xs uppercase tracking-[0.18em] text-muted">
      {label}
    </label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        rows={3}
        placeholder={placeholder}
        className="mt-2 w-full resize-none rounded-2xl border border-line bg-cream-soft/40 px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 outline-none transition focus:border-clay focus:bg-cream"
      />
    ) : (
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-line bg-cream-soft/40 px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 outline-none transition focus:border-clay focus:bg-cream"
      />
    )}
  </div>
);

const Radio = ({ name, value, defaultChecked }: { name: string; value: string; defaultChecked?: boolean }): React.ReactElement => (
  <label className="cursor-pointer">
    <input type="radio" name={name} value={value} defaultChecked={defaultChecked} className="peer sr-only" />
    <span className="inline-flex items-center rounded-full border border-line bg-cream-soft/40 px-4 py-2 text-sm text-ink-soft transition peer-checked:border-clay peer-checked:bg-cream peer-checked:text-ink hover:border-clay/60">
      {value}
    </span>
  </label>
);

type TriggerProps = {
  children: React.ReactNode;
  className?: string;
  format?: string;
};

export const BookingTrigger = ({ children, className, format }: TriggerProps): React.ReactElement => {
  const { open } = useBooking();
  return (
    <button type="button" onClick={() => open(format)} className={className}>
      {children}
    </button>
  );
};

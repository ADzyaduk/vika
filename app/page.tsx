import Image from "next/image";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Flame,
  Waves,
  Leaf,
  Moon,
  RotateCw,
  Eye,
  MessageCircle,
  Send,
} from "lucide-react";
import { WaveBackground } from "@/components/site/wave-background";
import { Reveal } from "@/components/site/reveal";
import { AudioPlayer } from "@/components/site/audio-player";
import { BookingTrigger } from "@/components/site/booking";

const requests = [
  { icon: Heart, title: "Отношения", text: "Возвращение тепла и контакта" },
  { icon: Sparkles, title: "Самооценка", text: "Спокойная внутренняя ценность" },
  { icon: Flame, title: "Эмоциональное выгорание", text: "Восстановление сил" },
  { icon: Waves, title: "Тревога", text: "Мягкое возвращение в опору" },
  { icon: Leaf, title: "Потеря ресурса", text: "Контакт с собственной энергией" },
  { icon: Moon, title: "Женское состояние", text: "Возвращение мягкости и потока" },
  { icon: RotateCw, title: "Повторяющиеся сценарии", text: "Выход из старых петель" },
  { icon: Eye, title: "Страх проявленности", text: "Спокойное право быть собой" },
];

const formats = [
  {
    name: "Базовый",
    price: "5 000 ₽",
    duration: "60 минут",
    description: "Точечный волновой чекап одной темы и первое прояснение состояния.",
    bullets: ["Диагностика текущего состояния", "Один ключевой запрос", "Письменное резюме сессии"],
  },
  {
    name: "Глубокий",
    price: "10 000 ₽",
    duration: "90 минут",
    description: "Развёрнутая работа — со сценариями, телом и подсознательными опорами.",
    bullets: ["Глубокая диагностика", "Работа с корневой темой", "Волновой трек под состояние", "Поддержка после сессии"],
    featured: true,
  },
  {
    name: "Сопровождение",
    price: "25 000 ₽",
    duration: "4 встречи / месяц",
    description: "Мягкое плотное сопровождение в период внутренних изменений.",
    bullets: ["4 индивидуальные сессии", "Личный плейлист треков", "Связь между встречами", "Индивидуальные практики"],
  },
];

const reviews = [
  {
    name: "Анна",
    role: "после глубокой сессии",
    text: "Впервые за долгое время почувствовала, что внутри стало тихо. Будто кто-то наконец услышал ту часть меня, которую я сама не слышала годами.",
  },
  {
    name: "Елена",
    role: "сопровождение, 2 месяца",
    text: "Не было давления, не было «надо разобраться». Было ощущение, что меня бережно ведут к самой себе. Состояния, которые казались вечными, начали растворяться.",
  },
  {
    name: "Мария",
    role: "базовый чекап",
    text: "Я ждала техник и инструментов, а получила глубину и спокойствие. Через неделю поняла, что перестала срываться там, где раньше горела.",
  },
];

export default function Home(): React.ReactElement {
  return (
    <main className="relative overflow-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-6 pt-5 sm:pt-7">
          <nav className="glass rounded-full px-5 py-3 flex items-center justify-between shadow-soft">
            <a href="#top" className="flex items-center gap-2.5 group">
              <span className="relative inline-flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-clay/30 animate-pulse-soft" />
                <span className="absolute inset-1.5 rounded-full bg-clay-deep" />
              </span>
              <span className="font-serif text-[15px] tracking-tight text-ink">Волновой чекап</span>
            </a>
            <div className="hidden md:flex items-center gap-7 text-[13px] text-ink-soft">
              <a href="#about" className="hover:text-clay-deep transition">Обо мне</a>
              <a href="#approach" className="hover:text-clay-deep transition">Подход</a>
              <a href="#tracks" className="hover:text-clay-deep transition">Треки</a>
              <a href="#formats" className="hover:text-clay-deep transition">Форматы</a>
              <a href="#blog" className="hover:text-clay-deep transition">Блог</a>
            </div>
            <BookingTrigger className="btn-primary hidden sm:inline-flex py-2! px-4! text-[13px]!">
              Записаться
            </BookingTrigger>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-32 pb-24 sm:pt-40 sm:pb-32">
        <WaveBackground variant="hero" />
        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="h-px w-8 bg-clay-deep/50" />
                Глубокая диагностика состояния
              </span>
              <h1 className="mt-6 font-serif font-light text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.02em] text-ink">
                Волновой чекап —<br />
                <span className="italic font-light text-clay-deep">глубокая диагностика</span><br />
                внутреннего состояния
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
                Помогаю увидеть скрытые причины эмоционального истощения, внутреннего напряжения
                и повторяющихся жизненных сценариев.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <BookingTrigger className="btn-primary">
                  Получить волновой чекап
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </BookingTrigger>
                <a href="#tracks" className="btn-ghost">Послушать волновой трек</a>
                <a href="#formats" className="btn-ghost">Выбрать формат работы</a>
              </div>

              <div className="mt-14 flex items-center gap-6 text-sm text-muted">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="h-9 w-9 rounded-full border-2 border-cream"
                      style={{ background: ["#dccab0", "#b89978", "#ece2d0"][i - 1] }}
                    />
                  ))}
                </div>
                <p className="leading-snug">
                  Более <span className="text-ink">400</span> человек прошли практику<br />
                  и вернули контакт с собой
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 relative animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="relative aspect-4/5 w-full max-w-md mx-auto">
                <div className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-sand to-cream-soft opacity-70 blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-4xl shadow-soft-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80&auto=format&fit=crop"
                    alt="Спокойствие и мягкий свет"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-cream/30 via-transparent to-transparent" />
                </div>
                {/* floating glass card */}
                <div className="absolute -bottom-6 -left-6 sm:-left-10 glass-strong rounded-2xl px-5 py-4 shadow-soft max-w-56">
                  <div className="eyebrow text-[10px]">Состояние сегодня</div>
                  <div className="mt-2 font-serif text-lg text-ink leading-tight">Тишина внутри</div>
                  <div className="mt-3 flex items-end gap-1 h-8">
                    {[0.3, 0.5, 0.7, 0.6, 0.85, 0.95, 0.8, 0.65, 0.45].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-full bg-clay-deep/80"
                        style={{ height: `${h * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 sm:py-32">
        <WaveBackground variant="section" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-4/5 max-w-sm rounded-3xl overflow-hidden shadow-soft-lg">
                <Image
                  src="/vika.jpg"
                  alt="Виктория Сняткова"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={150}>
              <span className="eyebrow">Обо мне</span>
              <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
                Виктория <span className="italic text-clay-deep">Сняткова</span>
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-ink-soft max-w-xl">
                Психология, подсознание, эмоциональная диагностика, волновые практики
                и работа с внутренним состоянием человека.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted max-w-xl">
                Веду частную практику. Сопровождаю мягко, без давления и без оценок —
                как пространство, где можно остановиться и снова услышать себя.
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
                {[
                  ["8+", "лет практики"],
                  ["400+", "клиентов"],
                  ["12 000+", "часов сопровождения"],
                ].map(([num, label]) => (
                  <div key={label} className="border-l border-line pl-4">
                    <dt className="font-serif text-3xl text-ink">{num}</dt>
                    <dd className="mt-1 text-xs uppercase tracking-wider text-muted">{label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT IS WAVE CHECKUP */}
      <section id="approach" className="relative py-24 sm:py-32 bg-cream-soft/50">
        <WaveBackground variant="deep" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Что такое волновой чекап</span>
            <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
              Внутренний пейзаж, <span className="italic text-clay-deep">который слышно</span>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Состояние человека — это не только мысли. Это эмоции, телесные отклики, подсознательные
              сценарии и тонкие волны, по которым проходит вся жизнь. Чекап мягко проявляет то,
              что обычно остаётся за пределами внимания.
            </p>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { t: "Эмоциональное состояние", d: "Что на самом деле звучит внутри прямо сейчас." },
              { t: "Подсознательные сценарии", d: "Повторяющиеся узоры, которые управляют выборами." },
              { t: "Внутреннее напряжение", d: "Где тело держит то, что не было прожито." },
              { t: "Восстановление ресурса", d: "Возвращение собственной энергии и мягкости." },
              { t: "Психика и тело", d: "Связь между состоянием и физическим откликом." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line/60 bg-cream/60 p-6 backdrop-blur-sm transition-all duration-500 hover:bg-cream hover:border-clay/40 hover:-translate-y-1">
                  <div className="font-serif text-[11px] tabular-nums text-clay-deep">0{i + 1}</div>
                  <h3 className="mt-3 font-serif text-xl text-ink leading-tight">{c.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHAKRAS — 7 центров */}
      <section id="chakras" className="relative py-24 sm:py-32 overflow-hidden">
        <WaveBackground variant="section" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5">
              <span className="eyebrow">7 центров</span>
              <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
                Волновой чекап по <span className="italic text-clay-deep">7 энергетическим центрам</span>
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-ink-soft max-w-xl">
                Во время чекапа я смотрю, как распределяется энергия по 7 основным центрам:
                от базовой опоры и уверенности до самовыражения, интуиции и связи со своим
                внутренним источником.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted max-w-xl">
                Вы получаете не просто «проценты по чакрам», а живую расшифровку: где энергия
                течёт свободно, где есть зажим, какие внутренние программы могут мешать,
                что забирает ресурс — и как мягко вернуть себя в состояние ясности, силы и спокойствия.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={150}>
              <ul className="space-y-3">
                {[
                  { ru: "Сахасрара", en: "Связь со своим источником", color: "#c9b1d9", pct: 78 },
                  { ru: "Аджна", en: "Интуиция, ясность, видение", color: "#a8a3d4", pct: 64 },
                  { ru: "Вишудха", en: "Голос, самовыражение, правда", color: "#a8c3d4", pct: 82 },
                  { ru: "Анахата", en: "Любовь, принятие, отношения", color: "#b8d4b0", pct: 71 },
                  { ru: "Манипура", en: "Воля, личная сила, уверенность", color: "#e6cb86", pct: 58 },
                  { ru: "Свадхистана", en: "Чувственность, удовольствие, поток", color: "#e3b08a", pct: 69 },
                  { ru: "Муладхара", en: "Опора, безопасность, заземление", color: "#d99b8e", pct: 74 },
                ].map((c, i) => (
                  <li
                    key={c.ru}
                    className="group flex items-center gap-5 rounded-2xl border border-line/60 bg-cream/60 backdrop-blur-sm px-5 py-4 transition-all duration-500 hover:border-clay/40 hover:bg-cream"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="relative shrink-0">
                      <span
                        className="block h-12 w-12 rounded-full blur-md opacity-70 absolute inset-0"
                        style={{ background: c.color }}
                      />
                      <span
                        className="relative block h-12 w-12 rounded-full shadow-soft"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, #fff8 0%, ${c.color} 55%, ${c.color}dd 100%)`,
                        }}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-serif text-lg text-ink leading-tight">{c.ru}</span>
                        <span className="font-serif tabular-nums text-sm text-clay-deep">{c.pct}%</span>
                      </div>
                      <div className="text-xs text-muted mt-0.5 leading-snug">{c.en}</div>
                      <div className="mt-2 h-0.5 rounded-full bg-line overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${c.pct}%`, background: c.color }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* что входит */}
          <Reveal className="mt-20" delay={120}>
            <div className="glass-strong rounded-3xl p-8 sm:p-12 shadow-soft">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-4">
                  <span className="eyebrow">Что входит в чекап</span>
                  <h3 className="mt-4 font-serif font-light text-3xl text-ink leading-[1.1]">
                    Персональная работа,<br />
                    <span className="italic text-clay-deep">собранная вручную</span> под вас
                  </h3>
                </div>
                <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    "Диагностика 7 чакр в процентах",
                    "Определение активного уровня реальности",
                    "Разбор искажений и эмоциональных блоков",
                    "Энергетические подключки и зоны утечки",
                    "Инкарнационные сценарии по запросу",
                    "Персональная вычетка",
                    "Волновая частота / ритм для настройки",
                    "Простая практика восстановления ресурса",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft leading-relaxed">
                      <span className="mt-2.5 h-px w-5 bg-clay-deep/70 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REQUESTS */}
      <section className="relative py-24 sm:py-32">
        <WaveBackground variant="section" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">С чем приходят</span>
            <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
              Темы, в которых <span className="italic text-clay-deep">я рядом</span>
            </h2>
          </Reveal>

          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {requests.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal as="li" key={r.title} delay={i * 60}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-line/70 bg-cream-soft/40 p-7 transition-all duration-500 hover:border-clay/50 hover:bg-cream hover:shadow-soft hover:-translate-y-1">
                    <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-sand/0 transition-all duration-700 group-hover:bg-sand/60" />
                    <div className="relative">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream border border-line/80 text-clay-deep">
                        <Icon className="h-5 w-5" strokeWidth={1.4} />
                      </span>
                      <h3 className="mt-5 font-serif text-xl text-ink leading-tight">{r.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="relative py-24 sm:py-32 bg-cream-soft/50">
        <WaveBackground variant="deep" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <Reveal className="lg:col-span-7">
              <span className="eyebrow">Почему это работает</span>
              <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
                Большинство состояний формируются <span className="italic text-clay-deep">глубже логики</span>
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-ink-soft">
                Мысли — лишь верхний слой. Настоящие причины повторяющихся реакций живут в эмоциональном
                поле, в теле и в подсознательных сценариях, сложившихся раньше слов.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Поэтому чекап работает не «через голову», а через мягкое возвращение внимания
                к тому, что уже звучит внутри — и стало незаметным.
              </p>

              <ul className="mt-10 space-y-4">
                {[
                  "Мы не пытаемся «починить» состояние — мы его слышим",
                  "Не давим на причины — мы даём им проявиться",
                  "Не учим контролю — возвращаем опору",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-2 inline-block h-px w-8 bg-clay-deep/60 shrink-0" />
                    <span className="text-ink leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={150}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-sand/60 to-cream blur-2xl" />
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-soft-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&q=80&auto=format&fit=crop"
                    alt="Тишина и мягкий свет"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WAVE TRACKS */}
      <section id="tracks" className="relative py-24 sm:py-32">
        <WaveBackground variant="section" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="max-w-2xl mx-auto text-center">
            <span className="eyebrow">Волновые треки</span>
            <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
              Аудио, которые <span className="italic text-clay-deep">возвращают в себя</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Мягкие звуковые волны для расслабления, восстановления, снижения тревоги
              и тёплого контакта с собой. Послушайте прямо сейчас.
            </p>
          </Reveal>

          <Reveal className="mt-12" delay={120}>
            <AudioPlayer />
          </Reveal>
        </div>
      </section>

      {/* FORMATS */}
      <section id="formats" className="relative py-24 sm:py-32 bg-cream-soft/50">
        <WaveBackground variant="deep" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Форматы работы</span>
            <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
              Выберите свою <span className="italic text-clay-deep">глубину</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {formats.map((f, i) => (
              <Reveal key={f.name} delay={i * 100}>
                <div
                  className={`relative h-full rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 ${
                    f.featured
                      ? "bg-ink text-cream shadow-soft-lg"
                      : "border border-line bg-cream/70 backdrop-blur-sm hover:shadow-soft"
                  }`}
                >
                  {f.featured && (
                    <span className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.22em] text-sand-deep">
                      рекомендую
                    </span>
                  )}
                  <div className={`text-xs uppercase tracking-[0.22em] ${f.featured ? "text-sand-deep" : "text-clay-deep"}`}>
                    {f.duration}
                  </div>
                  <h3 className={`mt-3 font-serif text-3xl ${f.featured ? "text-cream" : "text-ink"}`}>{f.name}</h3>
                  <div className={`mt-5 font-serif text-4xl ${f.featured ? "text-cream" : "text-ink"}`}>
                    {f.price}
                  </div>
                  <p className={`mt-5 text-sm leading-relaxed ${f.featured ? "text-cream/70" : "text-muted"}`}>
                    {f.description}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-2 inline-block h-px w-5 shrink-0 ${
                            f.featured ? "bg-sand-deep" : "bg-clay"
                          }`}
                        />
                        <span className={f.featured ? "text-cream/85" : "text-ink-soft"}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <BookingTrigger
                    format={`${f.name} — ${f.price}`}
                    className={`mt-9 inline-flex items-center gap-2 text-sm border-b pb-1 transition-all ${
                      f.featured
                        ? "text-cream border-cream/40 hover:border-cream"
                        : "text-ink border-ink/30 hover:border-ink"
                    }`}
                  >
                    Записаться
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </BookingTrigger>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="relative py-24 sm:py-32">
        <WaveBackground variant="section" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Отзывы</span>
            <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
              Тихие слова <span className="italic text-clay-deep">после практики</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 120}>
                <figure className="h-full rounded-3xl border border-line bg-cream/70 backdrop-blur-sm p-8 transition-all duration-500 hover:shadow-soft hover:-translate-y-1">
                  <Waves className="h-6 w-6 text-clay" strokeWidth={1.2} />
                  <blockquote className="mt-6 font-serif text-lg leading-relaxed text-ink">
                    «{r.text}»
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 pt-6 border-t border-line/70">
                    <span
                      className="h-9 w-9 rounded-full"
                      style={{ background: ["#dccab0", "#b89978", "#ece2d0"][i % 3] }}
                    />
                    <div>
                      <div className="text-sm text-ink">{r.name}</div>
                      <div className="text-xs text-muted">{r.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="relative py-24 sm:py-32 bg-cream-soft/50">
        <WaveBackground variant="deep" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">Блог</span>
              <h2 className="mt-5 font-serif font-light text-4xl sm:text-5xl tracking-tight text-ink leading-[1.05]">
                Тексты <span className="italic text-clay-deep">о состоянии</span>
              </h2>
              <p className="mt-5 text-base text-muted max-w-lg leading-relaxed">
                Короткие заметки про энергию, тело, отношения и подсознательные сценарии.
              </p>
            </div>
            <a href="#blog" className="btn-ghost self-start sm:self-auto">Все статьи</a>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              {
                tag: "Энергия",
                title: "Когда чакры «проседают» — что на самом деле происходит",
                excerpt: "Почему «низкие проценты» — не диагноз, а сигнал, и как мягко вернуть поток.",
                img: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=900&q=80&auto=format&fit=crop",
                date: "12 мая",
              },
              {
                tag: "Отношения",
                title: "Повторяющиеся сценарии: почему мы выбираем одно и то же",
                excerpt: "Как подсознательные опоры формируют партнёров — и как из этого выходить.",
                img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&q=80&auto=format&fit=crop",
                date: "28 апреля",
              },
              {
                tag: "Ресурс",
                title: "Тихое восстановление: 3 практики на каждый день",
                excerpt: "Минимум усилий, максимум возвращения к себе — без насилия над состоянием.",
                img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=900&q=80&auto=format&fit=crop",
                date: "14 апреля",
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <article className="group h-full overflow-hidden rounded-3xl border border-line/60 bg-cream backdrop-blur-sm transition-all duration-500 hover:border-clay/40 hover:shadow-soft hover:-translate-y-1">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-cream/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                      <span className="text-clay-deep">{p.tag}</span>
                      <span className="h-px w-6 bg-line" />
                      <span className="text-muted">{p.date}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-xl text-ink leading-snug">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{p.excerpt}</p>
                    <a
                      href="#blog"
                      className="mt-6 inline-flex items-center gap-2 text-sm text-ink border-b border-ink/30 pb-1 transition-all hover:border-ink"
                    >
                      Читать
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="relative py-24 sm:py-36 bg-cream-soft/60">
        <WaveBackground variant="hero" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="eyebrow">Пространство для себя</span>
            <h2 className="mt-6 font-serif font-light text-4xl sm:text-6xl tracking-tight text-ink leading-[1.05]">
              Здесь можно услышать себя<br />
              и <span className="italic text-clay-deep">восстановить внутреннюю опору</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft max-w-xl mx-auto">
              Мягкое пространство — без оценок, без давления, без спешки. Возможность остановиться
              и снова услышать самое тёплое внутри.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <BookingTrigger className="btn-primary">
                Записаться
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </BookingTrigger>
              <a href="https://t.me/" target="_blank" rel="noreferrer" className="btn-ghost">
                <Send className="h-4 w-4" strokeWidth={1.5} />
                Telegram
              </a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="btn-ghost">
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-line/60 py-12 bg-cream">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex h-5 w-5 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-clay/30" />
              <span className="absolute inset-1 rounded-full bg-clay-deep" />
            </span>
            <span className="font-serif text-ink">Виктория Сняткова</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Волновой чекап</span>
          </div>
          <div>© {new Date().getFullYear()} · Всё бережно</div>
        </div>
      </footer>
    </main>
  );
}

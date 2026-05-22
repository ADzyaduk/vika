import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WaveBackground } from "@/components/site/wave-background";
import { TELEGRAM_URL } from "@/lib/contacts";
import { posts, getPost } from "@/lib/blog";
import type { Metadata } from "next";

type Params = { slug: string };

export const generateStaticParams = (): Params[] =>
  posts.map((p) => ({ slug: p.slug }));

export const generateMetadata = async (
  { params }: { params: Promise<Params> },
): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Статья не найдена" };
  return {
    title: `${post.title} — Волновой чекап`,
    description: post.excerpt,
  };
};

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="relative overflow-hidden">
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-6 pt-5 sm:pt-7">
          <nav className="glass rounded-full px-5 py-3 flex items-center justify-between shadow-soft">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative inline-flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-clay/30 animate-pulse-soft" />
                <span className="absolute inset-1.5 rounded-full bg-clay-deep" />
              </span>
              <span className="font-serif text-[15px] tracking-tight text-ink">Волновой чекап</span>
            </Link>
            <Link
              href="/#blog"
              className="text-[13px] text-ink-soft hover:text-clay-deep transition inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              Все статьи
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <article className="relative pt-32 sm:pt-40 pb-20">
        <WaveBackground variant="section" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
            <span className="text-clay-deep">{post.tag}</span>
            <span className="h-px w-6 bg-line" />
            <span className="text-muted">{post.readTime}</span>
          </div>
          <h1 className="mt-6 font-serif font-light text-4xl sm:text-5xl md:text-6xl tracking-tight text-ink leading-[1.05]">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="relative mx-auto max-w-5xl px-6 mt-12">
          <div className="relative aspect-video overflow-hidden rounded-4xl shadow-soft-lg">
            <Image
              src={post.img}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="relative mx-auto max-w-3xl px-6 mt-16">
          <div className="space-y-6 text-[17px] leading-relaxed text-ink-soft">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Inline CTA */}
          <div className="mt-16 glass-strong rounded-3xl p-8 sm:p-10 shadow-soft text-center">
            <span className="eyebrow">Пройти чекап</span>
            <h2 className="mt-4 font-serif font-light text-2xl sm:text-3xl text-ink leading-[1.15]">
              Если откликается — <span className="italic text-clay-deep">приходите на сессию</span>
            </h2>
            <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
              Бережно, без оценок, в вашем темпе.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6"
            >
              Записаться в Telegram
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </article>

      {/* OTHER POSTS */}
      <section className="relative py-20 bg-cream-soft/50">
        <WaveBackground variant="deep" />
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-ink leading-tight">
            Ещё <span className="italic text-clay-deep">по теме</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group h-full overflow-hidden rounded-3xl border border-line/60 bg-cream backdrop-blur-sm transition-all duration-500 hover:border-clay/40 hover:shadow-soft hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-clay-deep">{p.tag}</span>
                    <span className="h-px w-6 bg-line" />
                    <span className="text-muted">{p.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-ink leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative border-t border-line/60 py-12 bg-cream">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative inline-flex h-5 w-5 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-clay/30" />
              <span className="absolute inset-1 rounded-full bg-clay-deep" />
            </span>
            <span className="font-serif text-ink">Виктория Сняткова</span>
          </Link>
          <div>© {new Date().getFullYear()} · Всё бережно</div>
        </div>
      </footer>
    </main>
  );
}

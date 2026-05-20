import { NextResponse } from "next/server";

type Lead = {
  name?: string;
  contact?: string;
  pref?: string;
  format?: string;
  message?: string;
  hp?: string;
};

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const POST = async (req: Request): Promise<Response> => {
  let body: Lead;
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ error: "Невалидный JSON" }, { status: 400 });
  }

  if (body.hp) return NextResponse.json({ ok: true });

  const name = body.name?.trim();
  const contact = body.contact?.trim();
  if (!name || !contact) {
    return NextResponse.json({ error: "Имя и контакт обязательны" }, { status: 400 });
  }
  if (name.length > 120 || contact.length > 200 || (body.message ?? "").length > 2000) {
    return NextResponse.json({ error: "Слишком длинное сообщение" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[lead]", { name, contact, pref: body.pref, format: body.format, message: body.message });
    return NextResponse.json({ ok: true, warning: "TG не настроен — заявка только в логи" });
  }

  const text =
    `<b>Новая заявка · Волновой чекап</b>\n\n` +
    `<b>Имя:</b> ${escapeHtml(name)}\n` +
    `<b>Контакт:</b> ${escapeHtml(contact)}\n` +
    (body.pref ? `<b>Канал:</b> ${escapeHtml(body.pref)}\n` : "") +
    (body.format ? `<b>Формат:</b> ${escapeHtml(body.format)}\n` : "") +
    (body.message ? `\n<i>${escapeHtml(body.message)}</i>` : "");

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });
    if (!tg.ok) {
      const detail = await tg.text();
      console.error("[lead] telegram error", detail);
      return NextResponse.json({ error: "Не удалось доставить заявку" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] network error", err);
    return NextResponse.json({ error: "Сетевая ошибка" }, { status: 502 });
  }
};

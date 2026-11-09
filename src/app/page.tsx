
"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Warsztat samochodowy");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [color, setColor] = useState("dark");
  const [generated, setGenerated] = useState(false);

  const themes = {
    dark: {
      bg: "#101827",
      card: "#1e293b",
      accent: "#8b5cf6",
      text: "#ffffff",
      muted: "#cbd5e1",
    },
    blue: {
      bg: "#eff6ff",
      card: "#ffffff",
      accent: "#2563eb",
      text: "#172554",
      muted: "#475569",
    },
    green: {
      bg: "#ecfdf5",
      card: "#ffffff",
      accent: "#059669",
      text: "#064e3b",
      muted: "#475569",
    },
  };

  const theme = themes[color as keyof typeof themes];

  function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char] || char);
  }

  function generate() {
    if (!name.trim() || !description.trim()) {
      alert("Wpisz nazwę firmy i opis działalności.");
      return;
    }

    setGenerated(true);
  }

  function download() {
    if (!generated) return;

    const safeName = escapeHtml(name);
    const safeType = escapeHtml(type);
    const safeDescription = escapeHtml(description);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeCity = escapeHtml(city);

    const phoneLink = phone.replace(/[^\d+]/g, "");

    const serviceList = services
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const html = `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeName} | ${safeType}</title>
<meta name="description" content="${safeDescription}">
<style>
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Arial,sans-serif;background:${theme.bg};color:${theme.text}}
header{padding:22px 8%;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #8884}
.logo{font-size:23px;font-weight:800}
nav a{color:${theme.text};text-decoration:none;margin-left:22px;font-size:14px}
.hero{padding:110px 8%;text-align:center;background:linear-gradient(135deg,${theme.bg},${theme.accent}33)}
.tag{color:${theme.accent};font-weight:bold;text-transform:uppercase;letter-spacing:3px}
h1{font-size:clamp(38px,7vw,68px);margin:22px 0}
p{line-height:1.8}
.hero p{max-width:650px;margin:20px auto}
.btn{display:inline-block;background:${theme.accent};color:white;padding:16px 30px;border-radius:9px;text-decoration:none;font-weight:bold;margin-top:18px}
section{padding:75px 8%;text-align:center}
h2{font-size:34px;margin-bottom:15px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:22px;margin-top:40px}
.card{background:${theme.card};padding:30px;border-radius:16px;text-align:left}
.card h3{color:${theme.accent}}
.about{max-width:750px;margin:auto}
.contact{background:${theme.card};border-radius:20px;padding:40px;max-width:750px;margin:auto}
.contact p{margin:12px}
footer{padding:30px;text-align:center;border-top:1px solid #8884;color:${theme.muted}}
@media(max-width:600px){
header{padding:18px 5%;flex-wrap:wrap;gap:15px}
nav a{margin-left:10px}
.hero{padding:75px 6%}
section{padding:55px 6%}
}
</style>
</head>
<body>
<header>
<div class="logo">${safeName}</div>
<nav>
<a href="#oferta">Oferta</a>
<a href="#onas">O nas</a>
<a href="#kontakt">Kontakt</a>
</nav>
</header>

<main>
<div class="hero">
<span class="tag">${safeType}</span>
<h1>${safeName}</h1>
<p>${safeDescription}</p>
<a class="btn" href="#kontakt">Skontaktuj się z nami</a>
</div>

<section id="oferta">
<h2>Nasze usługi</h2>
<p>Sprawdź, co możemy dla Ciebie zrobić.</p>
<div class="cards">
${serviceList.length
  ? serviceList.map((s) => `<div class="card"><h3>✦ ${escapeHtml(s)}</h3><p>Profesjonalna obsługa i indywidualne podejście do klienta.</p></div>`).join("")
  : `<div class="card"><h3>${safeType}</h3><p>${safeDescription}</p></div>`
}
</div>
</section>

<section id="onas">
<div class="about">
<h2>O naszej firmie</h2>
<p>${safeDescription}</p>
<p>Stawiamy na jakość, profesjonalizm i zadowolenie naszych klientów.</p>
</div>
</section>

<section id="kontakt">
<div class="contact">
<h2>Skontaktuj się z nami</h2>
${safePhone ? `<p>Telefon: <a style="color:${theme.accent}" href="tel:${phoneLink}">${safePhone}</a></p>` : ""}
${safeEmail ? `<p>E-mail: <a style="color:${theme.accent}" href="mailto:${safeEmail}">${safeEmail}</a></p>` : ""}
${safeCity ? `<p>Lokalizacja: ${safeCity}</p>` : ""}
${safePhone ? `<a class="btn" href="tel:${phoneLink}">Zadzwoń teraz</a>` : ""}
</div>
</section>
</main>

<footer>
© ${new Date().getFullYear()} ${safeName}. Wszelkie prawa zastrzeżone.
</footer>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "strona-klienta.html";
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <main className="min-h-screen bg-[#080b14] text-white">
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <div className="text-2xl font-black">
          WEBCRAFT<span className="text-violet-400"> AI</span>
        </div>
        <span className="rounded-full border border-violet-400/30 px-4 py-2 text-xs text-violet-300">
          PRIVATE STUDIO
        </span>
      </nav>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold tracking-[0.25em] text-violet-400">
            AI WEBSITE STUDIO
          </span>
          <h1 className="mt-5 text-4xl font-black md:text-6xl">
            Twoja agencja stron <span className="text-violet-400">internetowych.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Twórz profesjonalne projekty stron dla firm w kilka minut.
          </p>
        </div>

        <div className="grid gap-8 rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl md:grid-cols-2 md:p-10">
          <div className="space-y-5">
            <h2 className="text-xl font-bold">✦ Dane klienta</h2>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Nazwa firmy *</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Np. Auto Serwis Kowalski"
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Branża</label>
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4">
                <option>Warsztat samochodowy</option>
                <option>Firma budowlana</option>
                <option>Barber</option>
                <option>Restauracja</option>
                <option>Salon kosmetyczny</option>
                <option>Firma transportowa</option>
                <option>Sklep internetowy</option>
                <option>Inna firma</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Opis działalności *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Czym zajmuje się firma? Jakie ma doświadczenie?"
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Usługi (każda w osobnej linii)</label>
              <textarea value={services} onChange={(e) => setServices(e.target.value)}
                placeholder={"Wymiana oleju\nDiagnostyka komputerowa\nNaprawa silników"}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Numer telefonu</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="500 600 700"
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">E-mail</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="kontakt@firma.pl"
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Miasto</label>
              <input value={city} onChange={(e) => setCity(e.target.value)}
                placeholder="Np. Białystok"
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Kolor strony</label>
              <div className="flex gap-3">
                {[
                  ["dark", "Ciemny", "#8b5cf6"],
                  ["blue", "Niebieski", "#2563eb"],
                  ["green", "Zielony", "#059669"],
                ].map(([value, label, hex]) => (
                  <button key={value} onClick={() => setColor(value)}
                    className={`flex-1 rounded-xl border p-3 text-sm ${color === value ? "border-violet-400" : "border-white/10"}`}>
                    <span className="mb-2 block h-5 rounded" style={{ background: hex }} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={generate}
              className="w-full rounded-xl bg-violet-600 p-4 font-bold transition hover:bg-violet-500">
              ✦ GENERUJ PROFESJONALNĄ STRONĘ
            </button>
          </div>

          <div className="flex flex-col">
            <h2 className="mb-4 text-xl font-bold">Podgląd projektu</h2>

            <div className="flex min-h-[550px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10"
              style={{ background: generated ? theme.bg : "#080b14", color: generated ? theme.text : "#fff" }}>
              <div className="flex items-center justify-between border-b border-gray-500/20 p-4">
                <strong>{generated ? name : "Twoja firma"}</strong>
                <span className="text-xs">MENU</span>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center p-7 text-center">
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                  {generated ? type : "TWOJA BRANŻA"}
                </span>
                <h3 className="mt-5 text-3xl font-black">
                  {generated ? name : "Tutaj powstanie Twoja strona"}
                </h3>
                <p className="mt-5 max-w-sm text-sm opacity-70">
                  {generated ? description : "Wypełnij dane firmy i wygeneruj profesjonalny projekt."}
                </p>

                {generated && (
                  <div className="mt-6 w-full space-y-3">
                    <div className="rounded-xl p-4" style={{ background: theme.card }}>
                      <strong>Nasze usługi</strong>
                      <p className="mt-2 text-sm opacity-70">{services || type}</p>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: theme.card }}>
                      <strong>Kontakt</strong>
                      <p className="mt-2 text-sm opacity-70">{phone || email || city || "Dane kontaktowe"}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-500/20 p-4 text-center text-xs opacity-60">
                {generated ? "Podgląd projektu klienta" : "WEBCRAFT AI"}
              </div>
            </div>

            <button onClick={download} disabled={!generated}
              className="mt-4 rounded-xl border border-violet-400/40 p-4 font-bold text-violet-300 transition hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-30">
              ↓ POBIERZ GOTOWĄ STRONĘ HTML
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-600">
          WEBCRAFT AI • YOUR PRIVATE WEBSITE STUDIO
        </p>
      </section>
    </main>
  );
}

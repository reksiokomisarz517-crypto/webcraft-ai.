"use client";

import { useState } from "react";

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

const images: Record<string, string> = {
  "Warsztat samochodowy":
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3",
  "Firma budowlana":
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
  Barber:
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
  Restauracja:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  "Salon kosmetyczny":
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8",
  "Firma transportowa":
    "https://images.unsplash.com/photo-1519003722824-194d4455a60c",
  "Sklep internetowy":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
  "Inna firma":
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
};

export default function Home() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Warsztat samochodowy");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
const [color, setColor] = useState("dark");
const [template, setTemplate] = useState("modern");
const [generated, setGenerated] = useState(false);

  const theme = themes[color as keyof typeof themes];
  const image = images[type] || images["Inna firma"];
  const templateStyles: Record<string, string> = {
  modern: `
    .hero { border-radius: 0; }
    .service-card { border-radius: 17px; }
  `,
  premium: `
    body { font-family: Georgia, serif; }
    header { border-bottom: 2px solid #c9a96e; }
    .tag { color: #c9a96e; }
    .btn { background: #c9a96e; color: #111; border-radius: 2px; }
    .service-card { border: 1px solid #c9a96e; border-radius: 2px; }
    h1, h2 { letter-spacing: 1px; }
  `,
  minimal: `
    body { font-family: Arial, sans-serif; }
    header { background: #fff; }
    .hero { background: ${"#ffffff"} !important; color: #111827; min-height: 430px; }
    .hero p, .section-intro { color: #475569; }
    .tag { color: #2563eb; }
    .btn { border-radius: 3px; }
    .service-card, .contact { border-radius: 4px; box-shadow: none; }
  `,
  business: `
    body { font-family: Arial, sans-serif; }
    header { background: #12315a; color: white; }
    header nav a { color: white; }
    .hero { min-height: 480px; }
    .tag { color: #38bdf8; }
    .btn { background: #12315a; border-radius: 5px; }
    .service-card { border-radius: 8px; }
    h2 { color: #12315a; }
  `,
};

const selectedTemplateCss = templateStyles[template] || templateStyles.modern;

  function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char] || char);
  }

  const serviceList = services
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

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
    const safeImage = image;

    const phoneLink = phone.replace(/[^\d+]/g, "");

    const serviceCards = serviceList.length
      ? serviceList
          .map(
            (service) => `
              <article class="service-card">
                <div class="service-icon">✦</div>
                <h3>${escapeHtml(service)}</h3>
                <p>Profesjonalna obsługa i indywidualne podejście do każdego klienta.</p>
              </article>`
          )
          .join("")
      : `
        <article class="service-card">
          <div class="service-icon">✦</div>
          <h3>${safeType}</h3>
          <p>${safeDescription}</p>
        </article>`;

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
header{padding:22px 8%;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #8884;background:${theme.bg}}
.logo{font-size:23px;font-weight:900}
nav a{color:${theme.text};text-decoration:none;margin-left:24px;font-size:14px}
.hero{min-height:570px;padding:100px 8%;display:flex;align-items:center;background:linear-gradient(90deg,${theme.bg} 5%,${theme.bg}dd 45%,${theme.bg}55),url('${safeImage}?auto=format&fit=crop&w=1800&q=85') center/cover}
.hero-content{max-width:680px}
.tag{color:${theme.accent};font-weight:bold;text-transform:uppercase;letter-spacing:3px}
h1{font-size:clamp(42px,7vw,76px);line-height:1.05;margin:22px 0}
p{line-height:1.8}
.hero p{font-size:18px;max-width:600px;color:${theme.muted}}
.btn{display:inline-block;background:${theme.accent};color:white;padding:16px 30px;border-radius:9px;text-decoration:none;font-weight:bold;margin-top:20px}
section{padding:85px 8%;text-align:center}
h2{font-size:36px;margin-bottom:15px}
.section-intro{max-width:650px;margin:0 auto;color:${theme.muted}}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:22px;margin-top:45px}
.service-card{background:${theme.card};padding:32px;border-radius:17px;text-align:left;border:1px solid #8882}
.service-icon{font-size:30px;color:${theme.accent}}
.service-card h3{font-size:20px}
.service-card p{color:${theme.muted}}
.about{max-width:780px;margin:auto}
.contact{background:${theme.card};border-radius:22px;padding:45px;max-width:750px;margin:auto;border:1px solid #8882}
.contact a{color:${theme.accent}}
footer{padding:30px;text-align:center;border-top:1px solid #8884;color:${theme.muted}}
${selectedTemplateCss}
@media(max-width:650px){
header{padding:18px 5%;flex-wrap:wrap;gap:15px}
nav a{margin-left:10px}
.hero{padding:80px 6%;min-height:500px}
section{padding:60px 6%}
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
<div class="hero-content">
<span class="tag">${safeType}</span>
<h1>${safeName}</h1>
<p>${safeDescription}</p>
<a class="btn" href="#kontakt">Skontaktuj się z nami →</a>
</div>
</div>

<section id="oferta">
<h2>Nasze usługi</h2>
<p class="section-intro">Sprawdź, co możemy dla Ciebie zrobić.</p>
<div class="cards">${serviceCards}</div>
</section>

<section id="onas">
<div class="about">
<span class="tag">POZNAJ NAS</span>
<h2>O naszej firmie</h2>
<p>${safeDescription}</p>
<p>Stawiamy na jakość, profesjonalizm i zadowolenie naszych klientów.</p>
</div>
</section>

<section id="kontakt">
<div class="contact">
<span class="tag">JESTEŚMY DO DYSPOZYCJI</span>
<h2>Porozmawiajmy!</h2>
<p>Skontaktuj się z nami i poznaj naszą ofertę.</p>
${safePhone ? `<p>Telefon: <a href="tel:${phoneLink}">${safePhone}</a></p>` : ""}
${safeEmail ? `<p>E-mail: <a href="mailto:${safeEmail}">${safeEmail}</a></p>` : ""}
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

    const blob = new Blob([html], {
      type: "text/html;charset=utf-8",
    });

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

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold tracking-[0.25em] text-violet-400">
            AI WEBSITE STUDIO
          </span>
          <h1 className="mt-5 text-4xl font-black md:text-6xl">
            Twoja agencja stron{" "}
            <span className="text-violet-400">internetowych.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Twórz profesjonalne projekty stron dla firm w kilka minut.
          </p>
        </div>

        <div className="grid gap-8 rounded-3xl border border-white/kolor strony
         10 bg-[#111827] p-6 shadow-2xl md:grid-cols-2 md:p-10">
          <div className="space-y-5">
            <h2 className="text-xl font-bold">✦ Dane klienta</h2>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Nazwa firmy *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Np. Auto Serwis Kowalski"
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Branża
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4"
              >
                {Object.keys(images).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Opis działalności *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Czym zajmuje się firma? Jakie ma doświadczenie?"
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Usługi (każda w osobnej linii)
              </label>
              <textarea
                value={services}
                onChange={(e) => setServices(e.target.value)}
                placeholder={"Wymiana oleju\nDiagnostyka komputerowa\nNaprawa silników"}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Numer telefonu
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="500 600 700"
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                E-mail
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kontakt@firma.pl"
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Miasto
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Np. Białystok"
                className="w-full rounded-xl border border-white/10 bg-[#080b14] p-4 outline-none focus:border-violet-500"
              />
            </div>
<div>
  <label className="mb-3 block text-sm text-gray-300">
    Wybierz szablon strony
  </label>

  <div className="grid grid-cols-2 gap-3">
    {[
      ["modern", "Modern", "Nowoczesny"],
      ["premium", "Premium", "Luksusowy"],
      ["minimal", "Minimal", "Prosty"],
      ["business", "Business", "Firmowy"],
    ].map(([value, label, description]) => (
      <button
        key={value}
        type="button"
        onClick={() => {
          setTemplate(value);
          setGenerated(false);
        }}
        className={`rounded-xl border p-4 text-left transition ${
          template === value
            ? "border-violet-400 bg-violet-500/10"
            : "border-white/10 bg-[#080b14] hover:border-violet-400/50"
        }`}
      >
        <strong className="block">{label}</strong>
        <span className="mt-1 block text-xs text-gray-400">
          {description}
        </span>
        {template === value && (
          <span className="mt-2 block text-xs text-violet-400">
            ✓ Wybrany
          </span>
        )}
      </button>
    ))}
  </div>
</div>
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Kolor strony
              </label>
              <div className="flex gap-3">
                {[
                  ["dark", "Ciemny", "#8b5cf6"],
                  ["blue", "Niebieski", "#2563eb"],
                  ["green", "Zielony", "#059669"],
                ].map(([value, label, hex]) => (
                  <button
                    key={value}
                    onClick={() => setColor(value)}
                    className={`flex-1 rounded-xl border p-3 text-sm ${
                      color === value
                        ? "border-violet-400"
                        : "border-white/10"
                    }`}
                  >
                    <span
                      className="mb-2 block h-5 rounded"
                      style={{ background: hex }}
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generate}
              className="w-full rounded-xl bg-violet-600 p-4 font-bold transition hover:bg-violet-500"
            >
              ✦ GENERUJ PROFESJONALNĄ STRONĘ
            </button>
          </div>

          <div className="flex flex-col">
            <h2 className="mb-4 text-xl font-bold">Podgląd projektu</h2>

            <div
              className="flex min-h-[600px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10"
              style={{
                background: generated ? theme.bg : "#080b14",
                color: generated ? theme.text : "#fff",
              }}
            >
              <div className="flex items-center justify-between border-b border-gray-500/20 p-4">
                <strong>{generated ? name : "Twoja firma"}</strong>
                <span className="text-xs">MENU</span>
              </div>

              {generated ? (
                <>
                  <div
                    className="flex min-h-[280px] flex-col justify-center bg-cover bg-center p-7"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${theme.bg} 0%, ${theme.bg}cc 70%, transparent), url("${image}?auto=format&fit=crop&w=1000&q=80")`,
                    }}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: theme.accent }}
                    >
                      {type}
                    </span>
                    <h3 className="mt-4 text-3xl font-black">{name}</h3>
                    <p className="mt-4 max-w-sm text-sm opacity-80">
                      {description}
                    </p>
                    <span
                      className="mt-5 inline-block w-fit rounded-lg px-5 py-3 text-sm font-bold text-white"
                      style={{ background: theme.accent }}
                    >
                      Skontaktuj się z nami →
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold">Nasze usługi</h3>
                    <div className="mt-4 grid gap-3">
                      {(serviceList.length ? serviceList : [type]).map(
                        (service, index) => (
                          <div
                            key={index}
                            className="rounded-xl p-4"
                            style={{ background: theme.card }}
                          >
                            <strong style={{ color: theme.accent }}>
                              ✦ {service}
                            </strong>
                            <p className="mt-2 text-sm opacity-70">
                              Profesjonalna obsługa i indywidualne podejście.
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <div
                      className="mt-4 rounded-xl p-4"
                      style={{ background: theme.card }}
                    >
                      <strong>Kontakt</strong>
                      <p className="mt-2 text-sm opacity-70">
                        {phone || email || city || "Dane kontaktowe"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center p-7 text-center">
                  <span className="text-xs font-bold tracking-widest text-violet-400">
                    TWOJA BRANŻA
                  </span>
                  <h3 className="mt-5 text-3xl font-black">
                    Tutaj powstanie Twoja strona
                  </h3>
                  <p className="mt-5 max-w-sm text-sm text-gray-400">
                    Wypełnij dane firmy i wygeneruj profesjonalny projekt.
                  </p>
                </div>
              )}

              <div className="mt-auto border-t border-gray-500/20 p-4 text-center text-xs opacity-60">
                {generated ? "Podgląd projektu klienta" : "WEBCRAFT AI"}
              </div>
            </div>

            <button
              onClick={download}
              disabled={!generated}
              className="mt-4 rounded-xl border border-violet-400/40 p-4 font-bold text-violet-300 transition hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
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
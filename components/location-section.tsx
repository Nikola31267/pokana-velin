"use client"

export function LocationSection() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.123456789!2d23.3185!3d42.6196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s%D1%83%D0%BB.+%D0%97%D0%B0%D1%85%D0%B0%D1%80%D0%B8+%D0%97%D0%BE%D0%B3%D1%80%D0%B0%D1%84+55%2C+%D0%9A%D0%B2.+%D0%94%D1%80%D0%B0%D0%B3%D0%B0%D0%BB%D0%B5%D0%B2%D1%86%D0%B8!5e0!3m2!1sbg!2sbg!4v1234567890!5m2!1sbg!2sbg&q=ул.+Захари+Зограф+55,+кв.+Драгалевци,+1415+София"

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2 font-medium">Намери ни</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Мястото</h2>
          <p className="text-muted-foreground mt-3">
            Ресторант &ldquo;Проя&rdquo; &mdash; кв. Драгалевци‑Витоша, ул. &bdquo;Захари Зограф&ldquo; 55, 1415 София
          </p>
        </div>

        {/* Grid: photos left, map right */}
        <div className="grid md:grid-cols-2 gap-4 items-stretch">

          {/* Left — two stacked photos */}
          <div className="grid grid-rows-2 gap-4 h-[520px]">
            {/* Outside photo */}
            <div className="relative rounded-2xl overflow-hidden group shadow-sm border border-border">
              {/* 👇 Replace src with the real outside photo */}
              <img
                src="https://imgrabo.com/pics/guide/20201103105835_95020.png"
                alt="Ресторант Проя — екстериор"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback placeholder while no real image is set
                  const target = e.currentTarget
                  target.style.display = "none"
                  const parent = target.parentElement!
                  parent.style.background = "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted)/0.5) 100%)"
                  const label = document.createElement("div")
                  label.className = "absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground"
                  label.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><path d='M21 15l-5-5L5 21'/></svg><span style='font-size:0.85rem;font-weight:500'>Снимка — Екстериор</span>`
                  parent.appendChild(label)
                }}
              />
              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-lg border border-border">
                Екстериор
              </div>
            </div>

            {/* Inside photo */}
            <div className="relative rounded-2xl overflow-hidden group shadow-sm border border-border">
              {/* 👇 Replace src with the real inside photo */}
              <img
                src="https://perla-hotel.com/uploads/images/big/244_Perla_hotel_Restaurant_Proia_07.jpg"
                alt="Ресторант Проя — интериор"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = "none"
                  const parent = target.parentElement!
                  parent.style.background = "linear-gradient(135deg, hsl(var(--muted)/0.7) 0%, hsl(var(--muted)/0.3) 100%)"
                  const label = document.createElement("div")
                  label.className = "absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground"
                  label.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><path d='M21 15l-5-5L5 21'/></svg><span style='font-size:0.85rem;font-weight:500'>Снимка — Интериор</span>`
                  parent.appendChild(label)
                }}
              />
              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-lg border border-border">
                Интериор
              </div>
            </div>
          </div>

          {/* Right — Google Maps */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-border h-[520px]">
            <iframe
              title="Местоположение на ресторант Проя"
              src="https://maps.google.com/maps?q=%D1%83%D0%BB.+%D0%97%D0%B0%D1%85%D0%B0%D1%80%D0%B8+%D0%97%D0%BE%D0%B3%D1%80%D0%B0%D1%84+55+%D0%94%D1%80%D0%B0%D0%B3%D0%B0%D0%BB%D0%B5%D0%B2%D1%86%D0%B8+%D0%A1%D0%BE%D1%84%D0%B8%D1%8F&output=embed&z=16"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Directions button overlay */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=ул.+Захари+Зограф+55,+кв.+Драгалевци,+1415+София"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-2 rounded-xl border border-border shadow hover:bg-background transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Маршрут
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

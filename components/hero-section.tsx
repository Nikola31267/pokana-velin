"use client"

import { Sparkles, Calendar, Clock, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-20 text-balance">
          Каня те на бала ми!
        </h1>
        {/* Event Details Cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Дата</h3>
            <p className="text-muted-foreground">Събота, 30 Май, 2026</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Час</h3>
            <p className="text-muted-foreground">18:00 - 24:00</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Място</h3>
            <p className="text-muted-foreground">Ресторант "Проя"</p>
            <p className="text-muted-foreground text-xs">кв. Драгалевци, ул. Захари Зограф 55</p>
          </div>
        </div>
      </div>
    </section>
  )
}


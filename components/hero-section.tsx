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
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Class of 2026</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">
          Prom Night
        </h1>

        <p className="text-xl md:text-2xl text-primary font-medium mb-6">
          A Night to Remember
        </p>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 text-pretty">
          You are cordially invited to celebrate this magical evening with us.
          Join family and friends for an unforgettable night of dancing, laughter, and memories.
        </p>

        {/* Event Details Cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Date</h3>
            <p className="text-muted-foreground">Saturday, May 23rd, 2026</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Time</h3>
            <p className="text-muted-foreground">7:00 PM - 11:00 PM</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Venue</h3>
            <p className="text-muted-foreground">The Grand Ballroom</p>
            <p className="text-muted-foreground text-sm">123 Celebration Ave</p>
          </div>
        </div>
      </div>
    </section>
  )
}


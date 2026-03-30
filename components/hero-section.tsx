"use client"
import { useEffect, useRef } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"

function addToGoogleCalendar() {
  const startDate = "20260530T180000"   // 30 May 2026, 18:00
  const endDate = "20260531T000000"   // 31 May 2026, 00:00 (midnight)
  const title = encodeURIComponent("Бал 🎉")
  const location = encodeURIComponent('Ресторант "Проя", кв. Драгалевци, ул. Захари Зограф 55')
  const details = encodeURIComponent("Покана за бал 🥂✨")

  const url =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${title}` +
    `&dates=${startDate}/${endDate}` +
    `&location=${location}` +
    `&details=${details}`

  window.open(url, "_blank", "noopener,noreferrer")
}

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  opacitySpeed: number
  type: "circle" | "star" | "diamond"
  rotation: number
  rotationSpeed: number
  color: string
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    const colors = [
      "rgba(212, 175, 55,",   // gold
      "rgba(255, 220, 130,",  // soft gold
      "rgba(255, 255, 255,",  // white
      "rgba(200, 160, 255,",  // soft lavender
      "rgba(255, 182, 193,",  // soft pink
    ]

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createParticle = (x?: number, y?: number): Particle => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.1,
      opacitySpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      type: (["circle", "star", "diamond"] as const)[Math.floor(Math.random() * 3)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
    })

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const spikes = 4
      const outerRadius = size
      const innerRadius = size * 0.4
      let rot = (Math.PI / 2) * 3
      const step = Math.PI / spikes
      ctx.beginPath()
      ctx.moveTo(x, y - outerRadius)
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius)
        rot += step
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius)
        rot += step
      }
      ctx.lineTo(x, y - outerRadius)
      ctx.closePath()
    }

    const drawDiamond = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y - size)
      ctx.lineTo(x + size * 0.6, y)
      ctx.lineTo(x, y + size)
      ctx.lineTo(x - size * 0.6, y)
      ctx.closePath()
    }

    const initParticles = () => {
      particles = Array.from({ length: 90 }, () => createParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.y += p.speedY
        p.x += p.speedX
        p.opacity += p.opacitySpeed
        p.rotation += p.rotationSpeed

        if (p.opacity <= 0.05 || p.opacity >= 0.85) p.opacitySpeed *= -1
        if (p.y < -10) particles[i] = createParticle(Math.random() * canvas.width, canvas.height + 10)
        if (p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = createParticle(Math.random() * canvas.width, canvas.height + 10)
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`
        ctx.shadowBlur = p.size * 3
        ctx.shadowColor = `${p.color}0.6)`

        if (p.type === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.type === "star") {
          drawStar(ctx, 0, 0, p.size * 1.5)
          ctx.fill()
        } else {
          drawDiamond(ctx, 0, 0, p.size * 1.3)
          ctx.fill()
        }
        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Decorative blurs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center" style={{ zIndex: 1 }}>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-20 text-balance">
          Каня те на бала ми
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

        {/* Google Calendar button */}
        <div className="mt-8">
          <button
            onClick={addToGoogleCalendar}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
              <path fill="currentColor" d="M19.5 3h-2V1.5A.5.5 0 0 0 17 1h-1a.5.5 0 0 0-.5.5V3h-7V1.5A.5.5 0 0 0 8 1H7a.5.5 0 0 0-.5.5V3h-2A2.5 2.5 0 0 0 2 5.5v14A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-14A2.5 2.5 0 0 0 19.5 3zm.5 16.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V9h16v10.5zM4 7.5V5.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v2H4z" />
            </svg>
            Добави в Google Calendar
          </button>
        </div>
      </div>
    </section>
  )
}

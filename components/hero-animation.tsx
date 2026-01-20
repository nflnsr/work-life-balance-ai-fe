"use client"

import { useEffect, useRef } from "react"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5

        const colors = [
          "rgba(20, 184, 166, 0.7)", 
          "rgba(13, 148, 136, 0.7)",
          "rgba(45, 212, 191, 0.7)", 
          "rgba(94, 234, 212, 0.7)", 
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas!.width) this.x = 0
        else if (this.x < 0) this.x = canvas!.width

        if (this.y > canvas!.height) this.y = 0
        else if (this.y < 0) this.y = canvas!.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particlesArray: Particle[] = []
    const numberOfParticles = 50

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawBalanceIllustration(ctx, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      requestAnimationFrame(animate)
    }

    function drawBalanceIllustration(ctx: CanvasRenderingContext2D, width: number, height: number) {
      const centerX = width / 2
      const centerY = height / 2

      ctx.strokeStyle = "#0d9488"
      ctx.lineWidth = 3

      ctx.beginPath()
      ctx.moveTo(centerX - 100, centerY + 100)
      ctx.lineTo(centerX + 100, centerY + 100)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(centerX, centerY + 100)
      ctx.lineTo(centerX, centerY - 50)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(centerX - 120, centerY - 40)
      ctx.lineTo(centerX + 120, centerY - 60)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(centerX - 120, centerY - 10, 40, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(20, 184, 166, 0.2)" 
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(centerX + 120, centerY - 30, 40, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(45, 212, 191, 0.2)" 
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = "#0d9488"
      ctx.font = "20px Arial"
      ctx.fillText("Work", centerX - 140, centerY - 10)

      ctx.fillStyle = "#0d9488"
      ctx.fillText("Life", centerX + 105, centerY - 30)

      ctx.beginPath()
      ctx.arc(centerX, centerY - 100, 25, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(20, 184, 166, 0.7)" 
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = "white"
      ctx.font = "bold 16px Arial"
      ctx.fillText("AI", centerX - 10, centerY - 95)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-lg shadow-lg" />
}

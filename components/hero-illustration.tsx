import Image from "next/image"

export default function HeroIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-lg md:px-0 sm:px-10">
        <Image
          src="/images/work-life-balance.png"
          alt="Work-life balance illustration showing a person meditating between work and home spaces"
          width={600}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}

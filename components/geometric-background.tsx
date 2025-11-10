export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0" style={{ backgroundColor: "#FFE0B2" }} />
      <div className="absolute top-0 right-0 bottom-0 w-1/2" style={{ backgroundColor: "#FFCC80" }} />

      {/* Teal diamonds */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-green-700 rotate-45" />
      <div className="absolute top-60 left-40 w-8 h-8 bg-green-700 rotate-45" />
      <div className="absolute top-40 left-[30%] w-12 h-12 bg-green-700 rotate-45" />
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-green-700 rotate-45" />
      <div className="absolute top-0 right-[60%] w-24 h-24 bg-green-700 rotate-45" />

      {/* Peach diamonds */}
      <div className="absolute top-20 right-20 w-10 h-10 bg-red-700 rotate-45" />
      <div className="absolute top-60 right-[15%] w-6 h-6 bg-red-700 rotate-45" />
      <div className="absolute bottom-40 right-20 w-16 h-16 bg-red-700 rotate-45" />
      <div className="absolute top-[30%] right-[30%] w-8 h-8 bg-red-700 rotate-45" />
      <div className="absolute bottom-[10%] right-[40%] w-12 h-12 bg-red-700 rotate-45" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-red-700 rotate-45" />
      <div className="absolute top-[50%] left-[20%] w-10 h-10 bg-teal-700 rotate-45" />
      <div className="absolute bottom-[30%] right-[10%] w-8 h-8 bg-teal-700 rotate-45" />

      {/* Small scattered diamonds */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 ${i % 3 === 0 ? "bg-red-700" : i % 3 === 1 ? "bg-green-700" : "bg-teal-700"} rotate-45`}
          style={{
            top: `${Math.random() * 100}%`,
            right: `${Math.random() * 100}%`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
}

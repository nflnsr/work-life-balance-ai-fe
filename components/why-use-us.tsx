import Image from "next/image";

export function WhyUseUs() {
  return (
    <div className="relative block h-full bg-stone-200">
      <div className="flex h-96 bg-teal-400">
        <Image
          src="/images/why-use-us-1.png"
          alt="Why Use Us Background"
          width={1200}
          height={400}
          className="h-96 w-full max-w-[65%] object-cover opacity-90"
        />
        <div className="flex w-full items-center justify-center">
          <p className="text-7xl font-bold text-white">WORK</p>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 border-b-teal-500 border-l-teal-500 border-t-amber-500 border-r-amber-500 bg-white px-10 py-4 shadow-2xl">
        <h1 className="text-center font-delius-unicase text-2xl font-bold underline">
          WHY USE US?
        </h1>
        <p className="text-justify font-sans text-lg">
          It&apos;s a dediacted platform that provides comprehensive insurance
          solutions tailored to your needs. With our user-friendly interface,
          you can easily manage your policies, file claims, and access support
          anytime, anywhere.
        </p>
      </div>
      <div className="flex h-96 bg-amber-400">
        <div className="flex w-full items-center justify-center">
          <p className="text-7xl font-bold text-white">LIFE</p>
        </div>
        <Image
          src="/images/why-use-us-2.png"
          alt="Why Use Us Background"
          width={1920}
          height={400}
          className="h-96 w-full max-w-[65%] object-cover opacity-90"
        />
      </div>
    </div>
  );
}

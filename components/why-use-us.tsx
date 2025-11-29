import Image from "next/image";

export function WhyUseUs() {
  return (
    <div id="why-use-us" className="relative block h-full bg-stone-200">
      <div className="flex h-96 bg-teal-400">
        <Image
          src="/images/why-use-us-1.png"
          alt="Why Use Us Background"
          width={1200}
          height={400}
          className="h-96 w-full object-cover opacity-90 sm:max-w-[65%]"
        />
        <div className="hidden w-full items-center justify-center sm:flex">
          <p className="text-7xl font-bold text-white">WORK</p>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 z-10 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-md border-4 border-t-amber-500 border-r-amber-500 border-b-teal-500 border-l-teal-500 bg-white px-4 py-4 shadow-2xl sm:w-auto sm:px-10">
        <h1 className="text-center font-delius-unicase text-2xl font-bold underline">
          WHY USE US?
        </h1>
        <p className="text-justify font-sans text-lg">
          It&apos;s a dedicated platform that helps users achieve an optimal
          work-life balance. Integrates research and technology into a unified
          system that delivers services personalized to users&apos; needs.
        </p>
      </div>
      <div className="flex h-96 bg-amber-400">
        <div className="hidden w-full items-center justify-center sm:flex">
          <p className="text-7xl font-bold text-white">LIFE</p>
        </div>
        <Image
          src="/images/why-use-us-2.png"
          alt="Why Use Us Background"
          width={1920}
          height={400}
          className="h-96 w-full sm:max-w-[65%] object-cover opacity-90"
        />
      </div>
    </div>
  );
}

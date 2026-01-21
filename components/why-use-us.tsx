import Image from "next/image";
import whyUseUsBg1 from "@/assets/why-use-us-1.png";
import whyUseUsBg2 from "@/assets/why-use-us-2.png";

export function WhyUseUs() {
  return (
    <div id="why-use-us" className="relative block h-full bg-stone-200">
      <div className="flex h-full flex-col-reverse bg-teal-400 sm:flex-row">
        <Image
          src={whyUseUsBg1}
          alt="Why Use Us Background"
          width={1200}
          height={400}
          className="h-96 max-h-[280px] w-full object-cover opacity-90 sm:max-h-none sm:max-w-[65%]"
        />
        <div className="hidden w-full items-center justify-center sm:flex">
          <p className="text-center text-7xl font-bold text-white">WORK</p>
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
      <div className="flex h-full bg-amber-400 flex-col-reverse sm:flex-row">
        <div className="hidden w-full items-center justify-center sm:flex">
          <p className="text-center text-7xl font-bold text-white">LIFE</p>
        </div>
        <Image
          src={whyUseUsBg2}
          alt="Why Use Us Background"
          width={1920}
          height={400}
          className="h-96 max-h-[280px] w-full object-cover opacity-90 sm:max-h-none sm:max-w-[65%]"
        />
      </div>
    </div>
  );
}

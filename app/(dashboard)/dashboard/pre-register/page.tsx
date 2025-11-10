"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function PreRegisterPage() {
  return (
    <div className="min-h-screen h-0">

    <form className="min-h-[calc(100%-var(--header-height))] h-full bg-white py-5 rounded-xl">
      <Carousel className="w-full max-w-[700px] mx-auto px-5 h-0 min-h-full rounded-lg bg-white">
        <CarouselContent className=" min-h-full h-[100%] bg-white z-40">
          {Array.from({ length: Math.ceil(studentListQuestions.length / 5) }).map((_, index) => (
            <CarouselItem key={index} className="min-h-full h-full z-20 flex bg-white">
              <div className="min-h-full w-full flex flex-col justify-between h-0 sm:p-6 sm:pb-20 rounded-lg border-white bg-white shadow-lg group-data-[state=open]:motion-opacity-in-0 group-data-[state=open]:motion-translate-y-in-100 group-data-[state=open]:motion-blur-in-md">
                <React.Fragment>
                  <Label className="pt-5 text-lg font-semibold mb-4">
                    {studentListQuestions[index * 5 + 1]}
                  </Label>
                  {studentListQuestions[index * 5 + 1] && (
                    <RadioGroup defaultValue="option-one" className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Sangat setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">Netral</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Tidak setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                        <Label htmlFor="option-five">Sangat tidak setuju</Label>
                      </div>
                    </RadioGroup>
                  )}

                  <Label className="pt-5 text-lg font-semibold mb-4">
                    {studentListQuestions[index * 5 + 2]}
                  </Label>
                  {studentListQuestions[index * 5 + 2] && (
                    <RadioGroup defaultValue="option-one" className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Sangat setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">Netral</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Tidak setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                        <Label htmlFor="option-five">Sangat tidak setuju</Label>
                      </div>
                    </RadioGroup>
                  )}

                  <Label className="pt-5 text-lg font-semibold mb-4">
                    {studentListQuestions[index * 5 + 3]}
                  </Label>
                  {studentListQuestions[index * 5 + 3] && (
                    <RadioGroup defaultValue="option-one" className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Sangat setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">Netral</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Tidak setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                        <Label htmlFor="option-five">Sangat tidak setuju</Label>
                      </div>
                    </RadioGroup>
                  )}

                  <Label className="pt-5 text-lg font-semibold mb-4">
                    {studentListQuestions[index * 5 + 4]}
                  </Label>
                  {studentListQuestions[index * 5 + 4] && (
                    <RadioGroup defaultValue="option-one" className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Sangat setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">Netral</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Tidak setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                        <Label htmlFor="option-five">Sangat tidak setuju</Label>
                      </div>
                    </RadioGroup>
                  )}

                  <Label className="pt-5 text-lg font-semibold mb-4">
                    {studentListQuestions[index * 5 + 5]}
                  </Label>
                  {studentListQuestions[index * 5 + 5] && (
                    <RadioGroup defaultValue="option-one" className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Sangat setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">Netral</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Tidak setuju</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                        <Label htmlFor="option-five">Sangat tidak setuju</Label>
                      </div>
                    </RadioGroup>
                  )}
                </React.Fragment>
                {/* );
              })} */}
                <div className="flex justify-center px-1 w-full">
                  {index === Math.ceil(studentListQuestions.length / 5) - 1 && (
                    <button
                      className="px-2 w-full py-2 rounded-lg font-semibold text-white bg-green-600"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious>Selanjutnya</CarouselPrevious>
        <CarouselNext>Selanjutnya</CarouselNext>
      </Carousel>
    </form>
    </div>
  );
}

// const workerListQuestions = [
//   "Saya merasa puas dengan pekerjaan saya saat ini.",
//   "Fasilitas kerja yang tersedia cukup menunjang pekerjaan saya.",
//   "Saya merasa memiliki tanggung jawab penuh atas pekerjaan saya.",
//   "Atasan saya memberikan bantuan ketika saya menghadapi kesulitan kerja.",
//   "Atasan saya menghargai usaha dan kontribusi saya.",
//   "Atasan saya memperlakukan semua karyawan secara adil.",
//   "Saya memiliki hubungan yang baik dengan rekan kerja.",
//   "Rekan kerja saya bersedia membantu ketika saya membutuhkannya.",
//   "Terdapat kompetisi yang sehat di lingkungan kerja saya.",
//   "Promosi jabatan dilakukan secara teratur di tempat kerja saya.",
//   "Saya merasa memiliki kesempatan untuk dipromosikan.",
//   "Setiap promosi disertai dengan peningkatan keterampilan.",
//   "Gaji yang saya terima mencukupi kebutuhan hidup saya.",
//   "Saya menerima bonus berdasarkan kinerja saya.",
//   "Saya mengalami kenaikan gaji secara teratur.",
//   "Saya dapat membagi waktu dengan baik antara pekerjaan dan kehidupan pribadi.",
//   "Saya memiliki waktu cukup untuk menjalani aktivitas pribadi.",
//   "Saya dapat tetap berperilaku baik dan profesional saat bekerja.",
//   "Saya mampu memisahkan masalah pribadi dengan pekerjaan.",
//   "Saya mampu mengatasi tekanan pribadi saat bekerja.",
//   "Saya dapat menerima kritik dengan baik saat bekerja.",
//   "Saya tidak merasa khawatir terhadap masalah pribadi saat bekerja.",
//   "Saya menikmati pekerjaan saya.",
//   "Pekerjaan saya memberikan kebahagiaan dalam hidup saya.",
//   "Pekerjaan saya membuat hidup saya lebih tenang.",
//   "Kehidupan pribadi saya meningkatkan semangat saya dalam bekerja.",
//   "Saya memiliki cukup waktu untuk melakukan aktivitas pribadi.",
//   "Saya dapat menghabiskan waktu pribadi dengan baik dan seimbang.",
// ];

const studentListQuestions = [
  "Saya merasa puas dengan kegiatan akademik saya saat ini.",
  "Fasilitas akademik yang saya miliki mendukung saya dalam belajar.",
  "Saya merasa bertanggung jawab terhadap tugas dan kewajiban akademik saya.",
  "Pembimbing belajar saya memberikan bantuan saat saya mengalami kesulitan.",
  "Saya merasa dihargai atas usaha dan kontribusi saya dalam kegiatan akademik.",
  "Saya memiliki hubungan yang baik dengan teman-teman saya.",
  "Teman-teman saya bersedia membantu ketika saya membutuhkannya.",
  "Terdapat kompetisi yang sehat di lingkungan akademik saya.",
  "Terdapat kesempatan untuk melakukan pengembangan diri di lingkungan akademik.",
  "Saya merasa memiliki kesempatan untuk meraih prestasi akademik atau non-akademik.",
  "Saya merasa kemampuan dan keterampilan saya kian meningkat.",
  "Saya tidak memiliki kesulitan ekonomi dalam menunjang pendidikan saya.",
  "Saya merasa wawasan finansial saya terus meningkat.",
  "Saya tetap bisa bersikap baik dan profesional dalam kegiatan akademik.",
  "Saya bisa mengatasi tekanan pribadi saat menjalani perkuliahan.",
  "Saya dapat menerima saran dan kritik dari orang lain dengan baik.",
  "Saya menikmati proses belajar dan kegiatan akademik lainnya.",
  "Saya bisa membagi waktu dengan baik antara akademik dan kehidupan personal.",
  "Selain aktivitas akademik saya juga sedang melakukan kegiatan magang/bekerja.",
  "Saya memiliki cukup waktu untuk mengeksplorasi bidang yang saya tekuni.",
  "Saya dapat mengatasi masalah pribadi dengan baik.",
];

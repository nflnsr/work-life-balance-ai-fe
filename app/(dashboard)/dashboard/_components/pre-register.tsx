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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  QuestionnaireAnswerFormType,
  questionnaireAnswerSchema,
} from "@/validator/questionnaire";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAxiosPrivate } from "@/hooks/use-axios-private";

export default function PreRegisterPage({
  isStudent,
}: {
  isStudent?: boolean;
}) {
  const questions = isStudent ? studentListQuestions : workerListQuestions;
  // console.log(isStudent, "student?");

  const form = useForm<QuestionnaireAnswerFormType>({
    resolver: zodResolver(questionnaireAnswerSchema),
    defaultValues: {
      isStudent: isStudent || false,
      answers: [
        "SANGAT_TIDAK_SETUJU",
        "SANGAT_SETUJU",
        "SANGAT_SETUJU",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "NETRAL",
        "CUKUP_SETUJU",
        "SANGAT_TIDAK_SETUJU",
        "SANGAT_SETUJU",
        "SANGAT_TIDAK_SETUJU",
        "SANGAT_SETUJU",
      ],
    },
  });

  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const {
    mutate: mutateAnswerQuestionnaire,
    isPending: isPendingAnswerQuestionnaire,
  } = useMutation({
    mutationKey: ["questionnaire"],
    mutationFn: async (data: QuestionnaireAnswerFormType) => {
      const response = await axiosPrivate.post("/questionnaire", data);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Questionnaire submitted successfully");
      form.reset();
    },
  });

  console.log(form.formState.errors, "errrr");

  function onSubmit(input: QuestionnaireAnswerFormType) {
    console.log("test");
    console.log("Submitting form with input:", input);
    mutateAnswerQuestionnaire(input);
  }

  const lagiloading = true;
  return (
    <div className="h-full max-h-[calc(100%-var(--header-height))] w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full min-h-[calc(100%-var(--header-height))] rounded-xl py-5"
        >
          {isPendingAnswerQuestionnaire && (
            <div className="flex h-full motion-blur-in-md motion-opacity-in-0 motion-translate-y-in-100 flex-col items-center justify-center gap-4 pb-24 text-center">
              <p>Waiting AI to calculate...</p>
              <span className="block size-10 animate-spin rounded-full border-t-2 border-b-2 border-stone-600" />
              <div className="">
                <p className="pr-1">🧠Gemini 2.5 Pro</p>
                <div className="">
                  <p>Mesin penalaran AI flagship terdepan dari Google</p>
                  <p>
                    {" "}
                    Dirancang untuk menangani tugas paling kompleks dengan
                    pemahaman dan penalaran terbaik di kelasnya
                  </p>
                </div>
              </div>
            </div>
          )}
          <Carousel
            className={`mx-auto h-full min-h-full w-full rounded-lg bg-white pr-0.5 pl-3 shadow-2xl sm:px-10 md:max-w-[800px] xl:max-w-[1000px] ${isPendingAnswerQuestionnaire && "hidden"}`}
          >
            <div className="flex h-[36px] items-end justify-center">
              <p className="text-center font-sans text-xl font-semibold underline">
                You are here to go!
              </p>
            </div>
            <CarouselContent className="h-full bg-white pt-2 pb-16">
              {Array.from({ length: Math.ceil(questions.length / 5) }).map(
                (_, index) => (
                  <CarouselItem key={index} className="flex h-full bg-white">
                    <div
                      className="flex w-full flex-col justify-between overflow-y-auto rounded-lg border-white bg-white group-data-[state=open]:motion-blur-in-md group-data-[state=open]:motion-opacity-in-0 group-data-[state=open]:motion-translate-y-in-100"
                      onWheel={(e) => e.stopPropagation()}
                    >
                      <ScrollArea className="h-full pr-4 pb-2 text-justify">
                        <FormField
                          control={form.control}
                          name={`answers.${index * 5}`}
                          render={({ field }) => (
                            <>
                              <Label className="mb-4 text-sm font-semibold sm:text-lg">
                                {questions[index * 5]}
                              </Label>
                              <FormControl>
                                {questions[index * 5] && (
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col justify-between sm:flex-row"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_SETUJU"
                                        id={`option-one-${index * 5}`}
                                      />
                                      <Label
                                        htmlFor={`option-one-${index * 5}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="CUKUP_SETUJU"
                                        id={`option-two-${index * 5}`}
                                      />
                                      <Label
                                        htmlFor={`option-two-${index * 5}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Cukup setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="NETRAL"
                                        id={`option-three-${index * 5}`}
                                      />
                                      <Label
                                        htmlFor={`option-three-${index * 5}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Netral
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="KURANG_SETUJU"
                                        id={`option-four-${index * 5}`}
                                      />
                                      <Label
                                        htmlFor={`option-four-${index * 5}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Kurang setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_TIDAK_SETUJU"
                                        id={`option-five-${index * 5}`}
                                      />
                                      <Label
                                        htmlFor={`option-five-${index * 5}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat tidak setuju
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                )}
                              </FormControl>
                            </>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`answers.${index * 5 + 1}`}
                          render={({ field }) => (
                            <>
                              <Label className="mb-4 pt-5 text-sm font-semibold sm:text-lg">
                                {questions[index * 5 + 1]}
                              </Label>
                              <FormControl>
                                {questions[index * 5 + 1] && (
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col justify-between sm:flex-row"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_SETUJU"
                                        id={`option-one-${index * 5 + 1}`}
                                      />
                                      <Label
                                        htmlFor={`option-one-${index * 5 + 1}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="CUKUP_SETUJU"
                                        id={`option-two-${index * 5 + 1}`}
                                      />
                                      <Label
                                        htmlFor={`option-two-${index * 5 + 1}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Cukup setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="NETRAL"
                                        id={`option-three-${index * 5 + 1}`}
                                      />
                                      <Label
                                        htmlFor={`option-three-${index * 5 + 1}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Netral
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="KURANG_SETUJU"
                                        id={`option-four-${index * 5 + 1}`}
                                      />
                                      <Label
                                        htmlFor={`option-four-${index * 5 + 1}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Kurang setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_TIDAK_SETUJU"
                                        id={`option-five-${index * 5 + 1}`}
                                      />
                                      <Label
                                        htmlFor={`option-five-${index * 5 + 1}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat tidak setuju
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                )}
                              </FormControl>
                            </>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`answers.${index * 5 + 2}`}
                          render={({ field }) => (
                            <>
                              <Label className="mb-4 pt-5 text-sm font-semibold sm:text-lg">
                                {questions[index * 5 + 2]}
                              </Label>
                              <FormControl>
                                {questions[index * 5 + 2] && (
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col justify-between sm:flex-row"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_SETUJU"
                                        id={`option-one-${index * 5 + 2}`}
                                      />
                                      <Label
                                        htmlFor={`option-one-${index * 5 + 2}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="CUKUP_SETUJU"
                                        id={`option-two-${index * 5 + 2}`}
                                      />
                                      <Label
                                        htmlFor={`option-two-${index * 5 + 2}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Cukup setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="NETRAL"
                                        id={`option-three-${index * 5 + 2}`}
                                      />
                                      <Label
                                        htmlFor={`option-three-${index * 5 + 2}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Netral
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="KURANG_SETUJU"
                                        id={`option-four-${index * 5 + 2}`}
                                      />
                                      <Label
                                        htmlFor={`option-four-${index * 5 + 2}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Kurang setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_TIDAK_SETUJU"
                                        id={`option-five-${index * 5 + 2}`}
                                      />
                                      <Label
                                        htmlFor={`option-five-${index * 5 + 2}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat tidak setuju
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                )}
                              </FormControl>
                            </>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`answers.${index * 5 + 3}`}
                          render={({ field }) => (
                            <>
                              <Label className="mb-4 pt-5 text-sm font-semibold sm:text-lg">
                                {questions[index * 5 + 3]}
                              </Label>
                              <FormControl>
                                {questions[index * 5 + 3] && (
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col justify-between sm:flex-row"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_SETUJU"
                                        id={`option-one-${index * 5 + 3}`}
                                      />
                                      <Label
                                        htmlFor={`option-one-${index * 5 + 3}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="CUKUP_SETUJU"
                                        id={`option-two-${index * 5 + 3}`}
                                      />
                                      <Label
                                        htmlFor={`option-two-${index * 5 + 3}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Cukup setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="NETRAL"
                                        id={`option-three-${index * 5 + 3}`}
                                      />
                                      <Label
                                        htmlFor={`option-three-${index * 5 + 3}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Netral
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="KURANG_SETUJU"
                                        id={`option-four-${index * 5 + 3}`}
                                      />
                                      <Label
                                        htmlFor={`option-four-${index * 5 + 3}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Kurang setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_TIDAK_SETUJU"
                                        id={`option-five-${index * 5 + 3}`}
                                      />
                                      <Label
                                        htmlFor={`option-five-${index * 5 + 3}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat tidak setuju
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                )}
                              </FormControl>
                            </>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`answers.${index * 5 + 4}`}
                          render={({ field }) => (
                            <>
                              <Label className="mb-4 pt-5 text-sm font-semibold sm:text-lg">
                                {questions[index * 5 + 4]}
                              </Label>
                              <FormControl>
                                {questions[index * 5 + 4] && (
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col justify-between sm:flex-row"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_SETUJU"
                                        id={`option-one-${index * 5 + 4}`}
                                      />
                                      <Label
                                        htmlFor={`option-one-${index * 5 + 4}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="CUKUP_SETUJU"
                                        id={`option-two-${index * 5 + 4}`}
                                      />
                                      <Label
                                        htmlFor={`option-two-${index * 5 + 4}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Cukup setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="NETRAL"
                                        id={`option-three-${index * 5 + 4}`}
                                      />
                                      <Label
                                        htmlFor={`option-three-${index * 5 + 4}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Netral
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="KURANG_SETUJU"
                                        id={`option-four-${index * 5 + 4}`}
                                      />
                                      <Label
                                        htmlFor={`option-four-${index * 5 + 4}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Kurang setuju
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="SANGAT_TIDAK_SETUJU"
                                        id={`option-five-${index * 5 + 4}`}
                                      />
                                      <Label
                                        htmlFor={`option-five-${index * 5 + 4}`}
                                        className="text-xs sm:text-sm"
                                      >
                                        Sangat tidak setuju
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                )}
                              </FormControl>
                            </>
                          )}
                        />
                      </ScrollArea>
                      {/* );
              })} */}
                      {index === Math.ceil(questions.length / 5) - 1 && (
                        <div className="flex w-full justify-center px-1">
                          <Button
                            type="submit"
                            className="w-full rounded-lg bg-green-600 px-2 py-2 font-semibold text-white"
                          >
                            Submit
                          </Button>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ),
              )}
            </CarouselContent>
            <CarouselPrevious className="left-4 w-22 text-xs sm:left-12 sm:w-full">
              Selanjutnya
            </CarouselPrevious>
            <CarouselNext className="right-4 w-22 text-xs sm:right-12 sm:w-full">
              Selanjutnya
            </CarouselNext>
          </Carousel>
        </form>
      </Form>
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

// const studentListQuestions = [
//   "Saya merasa puas dengan kegiatan akademik saya saat ini.",
//   "Fasilitas akademik yang saya miliki mendukung saya dalam belajar.",
//   "Saya merasa bertanggung jawab terhadap tugas dan kewajiban akademik saya.",
//   "Pembimbing belajar saya memberikan bantuan saat saya mengalami kesulitan.",
//   "Saya merasa dihargai atas usaha dan kontribusi saya dalam kegiatan akademik.",
//   "Saya memiliki hubungan yang baik dengan teman-teman saya.",
//   "Teman-teman saya bersedia membantu ketika saya membutuhkannya.",
//   "Terdapat kompetisi yang sehat di lingkungan akademik saya.",
//   "Terdapat kesempatan untuk melakukan pengembangan diri di lingkungan akademik.",
//   "Saya merasa kemampuan dan keterampilan saya kian meningkat.",
//   "Saya tidak memiliki kesulitan ekonomi dalam menunjang pendidikan saya.",
//   "Saya merasa wawasan finansial saya terus meningkat.",
//   "Saya bisa mengatasi tekanan pribadi saat menjalani perkuliahan.",
//   "Saya dapat menerima saran dan kritik dari orang lain dengan baik.",
//   "Saya menikmati proses belajar dan kegiatan akademik lainnya.",
//   "Saya bisa membagi waktu dengan baik antara akademik dan kehidupan personal.",
//   "Selain aktivitas akademik saya juga sedang melakukan kegiatan magang/bekerja.",
//   "Saya memiliki cukup waktu untuk mengeksplorasi bidang yang saya tekuni.",
//   "Saya dapat mengatasi masalah pribadi dengan baik.",
//    "Saya merasa cemas terhadap masa depan dan karier saya.",
//   "Terkadang saya merasa overthinking terhadap hal-hal kecil dalam kehidupan sehari-hari.",
//   "Saya merasa kurang beristirahat akhir-akhir ini.",
//   "Saya mengalami kesulitan dalam mencari peluang magang atau kerja.",
//   "Saya memiliki kebiasaan atau hobi yang membantu saya mengurangi stres.",
//   "Kesehatan fisik dan mental saya seimbang.",
//   "Saya merasa memiliki tujuan hidup yang jelas.",
//   "Saya memiliki tempat bercerita atau seseorang yang bisa dipercaya saat saya merasa tertekan.",
// ];

const studentListQuestions = [
  // Akademik
  "Saya merasa puas dengan hasil akademik saya hingga saat ini.",
  "Fasilitas akademik yang saya miliki mendukung saya dalam belajar.",
  "Saya menikmati proses belajar dan kegiatan akademik lainnya.",
  "Saya memiliki kesulitan ekonomi dalam menunjang pendidikan saya.",
  "Saya bisa membagi waktu dengan baik antara akademik dan kehidupan personal.",

  // Pengembangan Diri
  "Saya merasa kemampuan dan keterampilan saya terus berkembang.",
  "Saya memiliki cukup waktu untuk mengeksplorasi bidang yang saya tekuni.",
  "Saya merasa wawasan finansial saya kian meningkat.",
  "Saya tidak merasa berkompetisi atau lingkungan saya berkompetisi dengan sehat.",

  // Sosial dan relasi
  "Saya memiliki hubungan yang baik di lingkungan yang saya tempati.",
  "Saya mendengarkan saran dan kritik dari orang lain.",
  "Lingkungan sosial saya mendukung apa yang saya lakukan.",
  "Saya merasa perlu berpenampilan dengan baik.",

  // Personal dan mental
  "Saya berusaha menyikapi suatu masalah sebaik mungkin.",
  "Saya cenderung menghindari konflik.",
  "Saya merasa kurang beristirahat akhir-akhir ini.",
  "Saya memikirkan hal-hal kecil yang saya alami di kehidupan sehari-hari.",
  "Saya memiliki kebiasaan atau hobi yang membantu saya mengurangi stres.",

  // Karier dan masa depan
  "Saya merasa tujuan hidup saya cukup jelas.",
  "Saya memiliki motivasi yang kuat untuk mencapai tujuan saya.",
  "Saya merasa cemas dengan masa depan dan karier saya.",
  "Saya mengalami kesulitan dalam mencari peluang dan kesempatan.",
  "Saya merasa khawatir dengan hal-hal tertentu meski hal tersebut di luar kendali saya.",
];

const workerListQuestions = [
  // Pekerjaan
  "Saya merasa puas dengan pekerjaan saya saat ini.",
  "Fasilitas kerja yang saya miliki mendukung produktivitas saya.",
  "Saya menikmati proses dan aktivitas dalam pekerjaan saya.",
  "Saya mengalami kesulitan ekonomi meskipun sudah bekerja.",
  "Saya bisa membagi waktu dengan baik antara pekerjaan dan kehidupan pribadi.",

  // Pengembangan Diri
  "Saya merasa kemampuan dan keterampilan saya terus berkembang di tempat kerja.",
  "Saya memiliki cukup waktu untuk meningkatkan kemampuan profesional saya.",
  "Saya memahami bagaimana cara mengelola keuangan pribadi dengan baik.",
  "Saya tidak merasa berkompetisi atau lingkungan saya berkompetisi dengan sehat.",

  // Sosial dan relasi
  "Saya memiliki hubungan kerja yang baik dengan rekan-rekan saya.",
  "Saya cenderung menghindari konflik.",
  "Saya mendengarkan saran dan kritik dari orang lain.",
  "Lingkungan saya mendukung dan menghargai apa yang saya lakukan.",
  "Saya merasa perlu berpenampilan dengan baik.",

  // Personal dan mental
  "Saya berusaha menyikapi suatu masalah sebaik mungkin.",
  "Saya merasa kurang beristirahat akhir-akhir ini.",
  "Saya memikirkan hal-hal kecil yang saya alami di kehidupan sehari-hari.",
  "Saya memiliki hobi atau kegiatan rutin yang membantu menghilangkan stres.",

  // Karier dan masa depan
  "Saya memiliki arah karier yang jelas.",
  "Saya memiliki motivasi yang kuat untuk mengembangkan karier saya.",
  "Saya merasa cemas dengan stabilitas dan masa depan pekerjaan saya.",
  "Saya mengalami kesulitan dalam mengembangkan karier atau mencari peluang yang lebih baik.",
  "Saya merasa khawatir dengan hal-hal tertentu meski hal tersebut di luar kendali saya.",
];

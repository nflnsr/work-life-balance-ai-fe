import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createNote, getUserNotes } from "@/services/note";
import { Plus, XIcon } from "lucide-react";
import { useState } from "react";

export function Note() {
  const [openAddNotes, setOpenAddNotes] = useState(false);
    const { data: dataNotes } = getUserNotes();
    const { mutate: mutateAddNotes } = createNote();

  return (
    <Card className="scroll-box h-[400px] w-full gap-0 overflow-y-auto md:h-auto">
      <CardHeader className="flex w-full flex-row justify-between space-y-0 pb-4">
        <div className="">
          <CardTitle>Your Great Notes</CardTitle>
          <CardDescription className="pt-0.5 text-[14px]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </div>
        <div>
          <Button
            onClick={() => setOpenAddNotes(!openAddNotes)}
            className={`h-7 has-[>svg]:px-1.5 ${openAddNotes ? "bg-red-400 hover:bg-red-400/85" : "bg-stone-200/70 hover:bg-stone-300"}`}
          >
            {openAddNotes ? (
              <XIcon className="h-4 w-4 fill-white text-white" />
            ) : (
              <Plus className="h-4 w-4 text-black" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="relative">
          {openAddNotes && (
            <>
              <Textarea
                name="addNotes"
                id="addNotes"
                className="mt-1 h-24 w-full px-2 pt-1 pb-8 text-sm ring-1 ring-gray-400 outline-none focus:ring-gray-800"
                placeholder="enter your notes..."
              />
              <Button
                onClick={() => {
                  setOpenAddNotes(false);
                  const textarea = document.getElementById(
                    "addNotes",
                  ) as HTMLTextAreaElement;
                  if (textarea) {
                    const notes = textarea.value;
                    mutateAddNotes({ content: notes });
                  }
                }}
                className="absolute right-3 bottom-1 bg-teal-500 text-white hover:bg-teal-600"
              >
                Save
              </Button>
            </>
          )}
        </div>
        <div className="space-y-3">
          {dataNotes?.[0]?.date &&
          new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }) !==
            new Date(dataNotes?.[0]?.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }) ? (
            <>
              {!openAddNotes && (
                <div className="mx-auto w-full pb-2">
                  <p className="text-center text-[14px] text-gray-500">
                    There&apos;s no note for today.
                  </p>
                  <p className="text-center text-[14px] text-gray-500">
                    Create one now!
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={() => setOpenAddNotes(true)}
                      className="mx-auto block bg-stone-300/75 text-center text-black hover:bg-stone-200"
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {dataNotes?.[0]?.items.map((item) => (
                <li key={item.id} className="text-sm text-gray-500">
                  {item.content}
                </li>
              ))}
            </>
          )}
        </div>
      </CardContent>
      <CardHeader className="pt-4 pb-3">
        <CardTitle>Your Notes Record</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {dataNotes?.length === 0 ? (
          <div>
            <p> There are no notes available.</p>
          </div>
        ) : (
          <>
            {dataNotes?.[0]?.date &&
            new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }) !==
              new Date(dataNotes?.[0]?.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              ? dataNotes?.map((note) => (
                  <div key={note.id} className="space-y-2">
                    <p className="text-[14px] text-gray-500">
                      {new Date(note.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {note.items.map((item) => (
                      <li key={item.id} className="text-sm text-gray-500">
                        {item.content}
                      </li>
                    ))}
                  </div>
                ))
              : dataNotes?.slice(1).map((note) => (
                  <div key={note.id} className="space-y-2">
                    <p className="text-[14px] text-gray-500">
                      {new Date(note.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {note.items.map((item) => (
                      <li key={item.id} className="text-sm text-gray-500">
                        {item.content}
                      </li>
                    ))}
                  </div>
                ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}

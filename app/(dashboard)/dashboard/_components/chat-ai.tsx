import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Avatar from "boring-avatars";
import { SendHorizonal, TrainFrontTunnel } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGetChats, useGetChatQuota, usePostChat } from "@/services/chat-ai";

export function ChatAI() {
  const [showDialogAlertChatAI, setShowDialogAlertChatAI] = useState(false);

  const { data: dataChat, isLoading: isLoadingChatAI } = useGetChats();
  const { data: dataChatQuota } = useGetChatQuota();

  const { mutate: mutateChatAi, isPending: isPendingChatAI } = usePostChat();

  return (
    <div>
      <div className="w-full rounded-t-md border border-b-0 bg-white px-4 py-1.5 font-bold shadow sm:w-fit">
        <p>
          <span className="text-amber-500">Ask me anything, </span>
          <span className="text-teal-500">I&apos;m here to help 😁</span>
        </p>
      </div>

      <div className="rounded-tr-md border bg-white px-3 pt-1 pb-2">
        <Label
          htmlFor="message"
          className="block pt-1 pb-0.5 text-xs font-medium text-gray-700 sm:text-sm"
        >
          You can ask me for 8 times a day! what a service 😎
        </Label>
        <Label>
          quota left:{" "}
          <span className="font-bold text-teal-600">
            {dataChatQuota?.chatQuota ?? 8}
          </span>
        </Label>
      </div>

      <div className="max-h-[550px] overflow-y-auto rounded-b-md border bg-white sm:max-h-[600px]">
        <div>
          <div className="relative h-full min-h-24 space-y-2 px-2 pt-4 sm:px-4">
            {(isLoadingChatAI || isPendingChatAI) && (
              <div className="absolute top-1/2 left-1/2 z-10 flex size-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white/40 py-10">
                <span className="block size-20 animate-spin rounded-full border-t-2 border-b-2 border-stone-600" />
              </div>
            )}
            {dataChat?.length === 0 && !isLoadingChatAI && !isPendingChatAI && (
              <div className="mx-auto w-full py-4">
                <p className="text-center text-[14px] text-gray-500">
                  No questions asked yet.
                </p>
                <p className="text-center text-[14px] text-gray-500">
                  Ask me now!
                </p>
              </div>
            )}
            {dataChat?.map((chatItem, index: number) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex gap-2 self-end pl-5">
                  <div className="h-fit max-w-[500px] rounded-sm bg-amber-100 px-2.5 py-1">
                    <div>{chatItem.message}</div>
                  </div>
                  <Avatar
                    name="Margaret Brent"
                    variant="beam"
                    className="size-3 sm:size-6"
                  />
                </div>

                <div className="flex h-fit gap-2 self-start pr-5">
                  <TrainFrontTunnel className="block size-3 shrink-0 text-gray-600 sm:size-6" />
                  <div className="max-w-[500px] rounded-sm bg-green-100 px-2.5 py-1">
                    <div>{chatItem.answer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 pr-2 pb-4 pl-4 sm:pr-4 sm:pl-12">
            <Textarea
              id="chat-ai"
              rows={3}
              minLength={3}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Type your question here..."
              disabled={
                isPendingChatAI ||
                isLoadingChatAI ||
                (dataChatQuota?.chatQuota ?? 0) <= 0
              }
            />
            <Button
              type="button"
              className="inline-flex cursor-pointer items-center rounded-md bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none disabled:pointer-events-auto disabled:cursor-not-allowed"
              onClick={() => {
                const textarea = document.getElementById(
                  "chat-ai",
                ) as HTMLTextAreaElement;
                if (textarea) {
                  const message = textarea.value;
                  if (message.trim().length < 3) {
                    setShowDialogAlertChatAI(true);
                    return;
                  }
                  mutateChatAi({ message });
                  textarea.value = "";
                }
              }}
              disabled={
                isPendingChatAI ||
                isLoadingChatAI ||
                (dataChatQuota?.chatQuota ?? 0) <= 0
              }
            >
              <SendHorizonal className="h-4 w-4" />
            </Button>

            <Dialog
              open={showDialogAlertChatAI}
              onOpenChange={setShowDialogAlertChatAI}
            >
              <DialogContent showCloseButton={false}>
                <DialogHeader>
                  <DialogTitle>
                    Oops! Please enter a message with at least 3 characters.
                  </DialogTitle>
                  <DialogDescription>
                    Your message is too short to process. Kindly provide more
                    details so I can assist you better.
                  </DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-400 hover:text-white hover:opacity-90"
                    variant="outline"
                    onClick={() => setShowDialogAlertChatAI(false)}
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

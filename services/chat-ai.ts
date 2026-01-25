import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { axiosGetPrivate, axiosPostPrivate } from "@/lib/axios";
import { IChat, IChatQuota } from "@/types/api/chat-ai";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ChatAIFormType } from "@/validators/chat-ai";

const baseAPIUrl = "/api/chat";

const useGetChats = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => axiosGetPrivate<IChat[]>(`${baseAPIUrl}`, axiosPrivate),
  });
};

const useGetChatQuota = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["chat-quota"],
    queryFn: () =>
      axiosGetPrivate<IChatQuota>(`${baseAPIUrl}/quota`, axiosPrivate),
  });
};

const usePostChat = (
  params?: UseMutationOptions<any, any, ChatAIFormType>,
) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-chat"],
    mutationFn: (data: ChatAIFormType) =>
      axiosPostPrivate<any>(`${baseAPIUrl}`, data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chat-quota"] });
      toast.success("Chat added successfully");
    },
    ...params,
  });
};

export { useGetChats, useGetChatQuota, usePostChat };

import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { CreateNoteForm, INote } from "@/types/api/note";
import { axiosGetPrivate, axiosPostPrivate } from "@/lib/utils";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const baseAPIUrl = "/note";

const getUserNotes = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["notes"],
    queryFn: () => axiosGetPrivate<INote[]>(`${baseAPIUrl}/me`, axiosPrivate),
  });
};

const createNote = (params?: UseMutationOptions<any, any, CreateNoteForm>) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-note"],
    mutationFn: (data: CreateNoteForm) =>
      axiosPostPrivate<any>(`${baseAPIUrl}`, data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note added successfully");
    },
    ...params,
  });
};

export { getUserNotes, createNote };

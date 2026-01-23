interface INote {
  id: number;
  date: Date;
  items: {
    id: number;
    content: string;
  }[];
}

interface CreateNoteForm {
  content: string;
}

export { type INote, type CreateNoteForm };
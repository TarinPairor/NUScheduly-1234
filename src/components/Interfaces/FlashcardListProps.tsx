export default interface FlashcardListProps {
  flashcards: {
    id: number;
    question: string;
    answer: string;
    options: string[];
  }[];
}

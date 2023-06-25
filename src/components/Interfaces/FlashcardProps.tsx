export default interface FlashcardProps {
  flashcard: {
    id: number;
    question: string;
    answer: string;
    options: string[];
  };
}

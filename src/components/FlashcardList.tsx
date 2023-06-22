import { Flashcard } from "./Flashcard";

interface FlashcardListProps {
  flashcards: {
    id: number;
    question: string;
    answer: string;
    options: string[];
  }[];
}

export function FlashcardList({ flashcards }: FlashcardListProps) {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard, index) => (
        <Flashcard
          flashcard={flashcard}
          key={flashcard.id}
          data-testid={`flashcard-${index}`}
        />
      ))}
    </div>
  );
}

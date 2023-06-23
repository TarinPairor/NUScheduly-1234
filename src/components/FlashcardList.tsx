import { Flashcard } from "./Flashcard";

interface FlashcardProps {
  flashcards: {
    id: number;
    question: string;
    answer: string;
    options: string[];
  }[];
}

export function FlashcardList({ flashcards }: FlashcardProps) {
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

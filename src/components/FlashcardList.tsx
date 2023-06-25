import { Flashcard } from "./Flashcard";
import FlashcardListProps from "./Interfaces/FlashcardListProps";

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

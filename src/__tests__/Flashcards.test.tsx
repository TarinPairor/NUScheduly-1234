import { shallow } from "enzyme";
import Flashcards, {
  Flashcards as FlashcardsType,
} from "../components/pages/Flashcards";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn(),
  addDoc: jest.fn(),
}));

describe("Flashcards", () => {
  test("should update the current card when 'Draw Card' button is clicked and there are cards available", () => {
    const currentCards = [
      { eng: "Card 1", han: "Han 1", pin: "Pin 1" },
      { eng: "Card 2", han: "Han 2", pin: "Pin 2" },
    ];
    const wrapper = shallow(<Flashcards userId="testUserId" />);

    // Mock the getRandomCard function to return the first card in the list
    const instance = wrapper.instance() as FlashcardsType; // Use the imported type
    jest.spyOn(instance, "getRandomCard").mockReturnValue(currentCards[0]);

    // Set the initial state of the cards
    wrapper.setState({ cards: currentCards });

    // Find the 'Draw Card' button and click it
    const drawCardButton = wrapper.find(".drawCard button");
    drawCardButton.simulate("click");

    // Expect the current card state to be updated to the first card in the list
    expect(wrapper.state("currentCard")).toEqual(currentCards[0]);
  });

  test("should show an alert message when 'Draw Card' button is clicked and there are no cards available", () => {
    const wrapper = shallow(<Flashcards userId="testUserId" />);

    // Set an empty array for the cards state
    wrapper.setState({ cards: [] });

    // Find the 'Draw Card' button and click it
    const drawCardButton = wrapper.find(".drawCard button");
    drawCardButton.simulate("click");

    // Expect the alert message state to be set
    expect(wrapper.state("alertMessage")).toBe("Card list is empty!");
    expect(wrapper.state("showAlert")).toBe(true);
  });

  test("should not update the current card when 'Draw Card' button is clicked and there is only one card available", () => {
    const currentCards = [{ eng: "Card 1", han: "Han 1", pin: "Pin 1" }];
    const wrapper = shallow(<Flashcards userId="testUserId" />);

    // Set the initial state of the cards
    wrapper.setState({ cards: currentCards });

    // Find the 'Draw Card' button and click it
    const drawCardButton = wrapper.find(".drawCard button");
    drawCardButton.simulate("click");

    // Expect the current card state to remain unchanged since there is only one card available
    expect(wrapper.state("currentCard")).toEqual({});
  });

  test("should close the alert message when 'Close' button on the alert is clicked", () => {
    const wrapper = shallow(<Flashcards userId="testUserId" />);

    // Set the initial state for showAlert and alertMessage
    wrapper.setState({ showAlert: true, alertMessage: "Test Alert" });

    // Find the alert component and trigger the onClose prop
    const alertComponent = wrapper.find("Alert");
    const onCloseProp = alertComponent.prop("onClose") as () => void;
    onCloseProp();

    // Expect the showAlert and alertMessage states to be updated
    expect(wrapper.state("showAlert")).toBe(false);
    expect(wrapper.state("alertMessage")).toBe("");
  });
});

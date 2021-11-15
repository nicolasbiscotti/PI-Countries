import { render, screen } from "@testing-library/react";
import Search from "../components/Search/Search";

describe("Search test", () => {
    beforeEach(() => {
    render(<Search />);
  });
  test("renders button search", () => {
    const searchButton = screen.getByText(/search/i);
    expect(searchButton).toBeInTheDocument();
  });
  it("render the input text", () => {
    const input = screen.getByPlaceholderText(/search country by name../i);
    expect(input).toBeInTheDocument();
  });
});

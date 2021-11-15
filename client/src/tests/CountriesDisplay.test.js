import { render, screen } from "@testing-library/react";
import CountriesDisplay from "../components/CountriesDisplay/CountriesDisplay";

describe("CountriesDisplay test", () => {
  beforeEach(() => {
    render(<CountriesDisplay />);
  });
  it("renders Solomon Islands name", () => {
    const argentina = screen.getByText(/Solomon Islands/i);
    expect(argentina).toBeInTheDocument();
  });
  xit("render the next span", () => {
    const next = screen.getByText(/Previous../i);
    expect(next).toBeInTheDocument();
  });
});

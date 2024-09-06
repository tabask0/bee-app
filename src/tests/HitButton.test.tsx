import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HitButton from "./../components/HitButton";

describe("HitButton Component", () => {
  it("should render a hit button", () => {
    render(<HitButton onHit={jest.fn()} disabled={false} />);
    expect(screen.getByRole("button", { name: /Hit!/i })).toBeInTheDocument();
  });

  it("should call onHit when the button is clicked", () => {
    const onHitMock = jest.fn();
    render(<HitButton onHit={onHitMock} disabled={false} />);
    fireEvent.click(screen.getByRole("button", { name: /Hit!/i }));
    expect(onHitMock).toHaveBeenCalledTimes(1);
  });

  it("should disable the button when disabled is true", () => {
    render(<HitButton onHit={jest.fn()} disabled={true} />);
    expect(screen.getByRole("button", { name: /Hit!/i })).toBeDisabled();
  });
});

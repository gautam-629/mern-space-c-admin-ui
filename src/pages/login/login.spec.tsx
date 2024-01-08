import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoginPage } from "./Login";

// group testing case
describe("Login Page", () => {
  it("should render with required fields", () => {
    //render components
    render(<LoginPage />);

    //getBy->throw an error
    //fingBy->Async
    //queryBy->null
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login in" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: "Remember me" })
    ).toBeInTheDocument();
    expect(screen.getByText("Forgot password")).toBeInTheDocument();
  });
});

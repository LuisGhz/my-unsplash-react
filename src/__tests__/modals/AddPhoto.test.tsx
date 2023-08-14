import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCreatePhoto } from "../../hooks/useCreatePhoto";
import { AddPhoto } from "../../modals/AddPhoto";

vi.mock("../../hooks/useCreatePhoto");

describe("AddPhoto", () => {

  it("should fill with invalid data and submit the form", async () => {
    const setIsAddPhotoModalOpen = vi.fn();
    vi.mocked(useCreatePhoto).mockReturnValue({
      createPhoto: vi.fn(),
      errorResponse: undefined,
      createState: "initial",
    });

    render(<AddPhoto setIsModalOpen={setIsAddPhotoModalOpen} />);
    const label = screen.getByLabelText(/label/i);
    const url = screen.getByLabelText(/photo url/i);
    const submit = screen.getByRole("button", { name: /submit/i });
    await userEvent.type(label, "a");
    await userEvent.type(url, "a");
    userEvent.click(submit);
    screen.findByText(/Label must be between 5 and 20 characters/i);
    screen.findByText(/Url is invalid/i);
  });

  it("should not submit with emtpy data ", async () => {
    const setIsAddPhotoModalOpen = vi.fn();
    vi.mocked(useCreatePhoto).mockReturnValue({
      createPhoto: vi.fn(),
      errorResponse: undefined,
      createState: "initial",
    });
    render(<AddPhoto setIsModalOpen={setIsAddPhotoModalOpen} />);
    const submit = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submit);
    screen.findByText(/Label cannot be empty/i);
    screen.findByText(/Url is invalid/i);
  });

  it("should submit with valid data", async () => {
    const mock = vi.fn();
    vi.mocked(useCreatePhoto).mockReturnValue({
      createPhoto: mock,
      errorResponse: undefined,
      createState: "initial",
    });
    const setIsAddPhotoModalOpen = vi.fn();
    render(<AddPhoto setIsModalOpen={setIsAddPhotoModalOpen} />);
    const label = screen.getByLabelText(/label/i);
    const url = screen.getByLabelText(/photo url/i);
    const submit = screen.getByRole("button", { name: /submit/i });
    await userEvent.type(label, "12345");
    await userEvent.type(url, "https://www.example.com");
    await userEvent.click(submit);
    expect(mock).toHaveBeenCalledWith("12345", "https://www.example.com");
  });
});

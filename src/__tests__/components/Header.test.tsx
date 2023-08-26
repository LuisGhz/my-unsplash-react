import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../../components/Header";
import { AppContext } from "../../context/AppContext";

describe("Header", () => {
  // https://github.com/testing-library/react-testing-library/issues/1198 - Helped me to understand how to use fake timers
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should make a search", async () => {
    const ue = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const setLabelToSearch = vi.fn();
    const searchText = "Tree";
    render(
      <AppContext.Provider value={{ setLabelToSearch }}>
        <Header />
      </AppContext.Provider>
    );

    const input = screen.getByPlaceholderText(/search by name/i);
    await ue.type(input, searchText);
    await act(() => {
      vi.runAllTimers();
    });
    expect(setLabelToSearch).toHaveBeenCalledWith(searchText);
  });
});

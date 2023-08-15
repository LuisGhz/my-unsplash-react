import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../../components/Header';


describe('Header', () => {
  // https://github.com/testing-library/react-testing-library/issues/1198 - Helped me to understand how to use fake timers
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should make a search", async () => {
    const ue = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    const onSearch = vi.fn();
    const searchText = "Tree";
    render(<Header onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search by name/i);
    await ue.type(input, searchText);
    await act(() => {
      vi.runAllTimers();
    });
    expect(onSearch).toHaveBeenCalledWith(searchText);
  });
});

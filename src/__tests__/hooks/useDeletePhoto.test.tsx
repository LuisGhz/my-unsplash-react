import { renderHook, act } from "@testing-library/react";
import { useDeletePhoto } from "../../hooks/useDeletePhoto";

describe("useDeletePhoto", () => {
  it("should return initial state", () => {
    const { result } = renderHook(() => useDeletePhoto());
    expect(result.current.deleteState).toEqual("initial");
  });

  it("Should delete photo", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      } as Response)
    );
    const { result } = renderHook(() => useDeletePhoto());
    await act(async () => {
      result.current.deletePhoto("1");
    });
    expect(result.current.deleteState).toEqual("success");
  });

  it("Should return error response", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "error" }),
      } as Response)
    );
    const { result } = renderHook(() => useDeletePhoto());
    await act(async () => {
      result.current.deletePhoto("1");
    });
    expect(result.current.deleteState).toEqual("error");
    expect(result.current.errorResponse).toEqual({ error: "error" });
  });

  it("Should return error response", async () => {
    global.fetch = vi.fn(() => Promise.reject());
    const { result } = renderHook(() => useDeletePhoto());
    await act(async () => {
      result.current.deletePhoto("1");
    });
    expect(result.current.deleteState).toEqual("error");
    expect(result.current.errorResponse).toEqual("Something went wrong");
  });
});

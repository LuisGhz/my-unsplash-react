import { renderHook, act } from "@testing-library/react";
import { useGetPhotos } from "../../hooks/useGetPhotos";
import { Photo } from "../../models/Photo";

describe("useGetPhotos", () => {
  it("should return response, loading, error, and getPhotos", async () => {
    const returnData: Photo[] = [
      {
        label: "test",
        url: "http://test.com",
      },
    ];
    global.fetch = vi
      .fn()
      .mockReturnValue(
        Promise.resolve({ ok: true, json: () => Promise.resolve(returnData) })
      );
    const { result } = renderHook(useGetPhotos);

    await act(async () => {
      await result.current.getPhotos();
    });

    expect(result.current.response).toEqual(returnData);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/");
  });

  it("should return response with search text", async () => {
    const returnData: Photo[] = [
      {
        label: "test",
        url: "http://test.com",
      },
    ];
    global.fetch = vi
      .fn()
      .mockReturnValue(
        Promise.resolve({ ok: true, json: () => Promise.resolve(returnData) })
      );
    const { result } = renderHook(useGetPhotos);

    await act(async () => {
      await result.current.getPhotos("test");
    });

    expect(result.current.response).toEqual(returnData);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/?query=test"
    );
  });

  it("should return error", async () => {
    global.fetch = vi
      .fn()
      .mockReturnValue(Promise.resolve({ ok: false }));
    const { result } = renderHook(useGetPhotos);

    await act(async () => {
      await result.current.getPhotos();
    });

    expect(result.current.error).toEqual("Error fetching data");
  });
});

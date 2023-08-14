import { useValidateAddPhotoForm } from "../../hooks/useValidateAddPhotoForm";

describe("useValidateAddPhotoForm", () => {
  const { isNotBlank, isValidLabel, isValidUrl } = useValidateAddPhotoForm();

  describe("isNotBlank", () => {
    test("returns true when string is not blank", () => {
      expect(isNotBlank("not blank")).toBe(true);
    });

    test("returns false when string is blank", () => {
      expect(isNotBlank("")).toBe(false);
      expect(isNotBlank("             ")).toBe(false);
    });
  });

  describe("isValidLabel", () => {
    test("returns true when label is valid", () => {
      expect(isValidLabel("valid label")).toBe(true);
    });

    test("returns false when label is empty or it is too short", () => {
      expect(isValidLabel("")).toBe(false);
      expect(isValidLabel("labe")).toBe(false);
      expect(isValidLabel("        .          ")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    test("returns true when url is valid", async () => {
      expect(isValidUrl("https://www.google.com")).toBe(true);
    });

    test("returns false when url is invalid", async () => {
      expect(isValidUrl("")).toBe(false);
      expect(isValidUrl("http://")).toBe(false);
      expect(isValidUrl("https://")).toBe(false);
      expect(isValidUrl("https://www")).toBe(false);
      expect(isValidUrl("https://www.")).toBe(false);
    });
  });
});

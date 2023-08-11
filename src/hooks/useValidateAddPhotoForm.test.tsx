import { useValidateAddPhotoForm } from "./useValidateAddPhotoForm";

describe("useValidateAddPhotoForm", () => {
  const { isValidLabel, isValidUrl } = useValidateAddPhotoForm();

  describe("isValidLabel", () => {
    test('returns true when label is valid', () => {
      expect(isValidLabel('valid label')).toBe(true);
    });

    test('returns false when label is empty or it is too short', () => {
      expect(isValidLabel('')).toBe(false);
      expect(isValidLabel('labe')).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    test('returns true when url is valid', async () => {
      expect(await isValidUrl('https://www.google.com')).toBe(true);
    });

    test('returns false when url is invalid', async () => {
      expect(await isValidUrl('')).toBe(false);
      expect(await isValidUrl('http://')).toBe(false);
      expect(await isValidUrl('https://')).toBe(false);
      expect(await isValidUrl('https://www')).toBe(false);
      expect(await isValidUrl('https://www.')).toBe(false);
    });
  });
});
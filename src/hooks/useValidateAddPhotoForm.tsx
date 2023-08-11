export const useValidateAddPhotoForm = () => {
  const isValidLabel = (label: string) => {
    const cleanLabel = label.trim();
    return cleanLabel.length > 0 && cleanLabel.length >= 5 && cleanLabel.length <= 20;
  }

  const isValidUrl = (url: string) => {
    const cleanUrl = url.trim();
    const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    return urlRegex.test(cleanUrl);
  }

  return {
    isValidLabel,
    isValidUrl,
  }
};

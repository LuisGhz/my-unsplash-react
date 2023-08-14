import isUrlHttp from 'is-url-http'

export const useValidateAddPhotoForm = () => {
  const isNotBlank = (str: string) => {
    return str.trim().length > 0;
  };

  const isValidLabel = (label: string) => {
    const cleanLabel = label.trim();
    return cleanLabel.length >= 5 && cleanLabel.length <= 20;
  };

  const isValidUrl = (url: string) => {
    return isUrlHttp(url);
  };

  return {
    isNotBlank,
    isValidLabel,
    isValidUrl,
  };
};

import { linkExists } from 'link-exists';

export const useValidateAddPhotoForm = () => {
  const isValidLabel = (label: string) => {
    const cleanLabel = label.trim();
    return (
      cleanLabel.length > 0 && cleanLabel.length >= 5 && cleanLabel.length <= 20
    );
  };

  const isValidUrl = async (url: string) => {
    const isValid = await linkExists(url);
    return isValid;
    // const urlRegex =
    //   /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    // return urlRegex.test(url);
    // let isValidUrl = false;
    // try {
    //   new URL(url);
    //   isValidUrl = true;
    // }
    // catch (_) {
    //   isValidUrl = false;
    // }

    // return isValidUrl;
  };

  return {
    isValidLabel,
    isValidUrl,
  };
};

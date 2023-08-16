import React from "react";
import "./AddPhoto.css";
import { useValidateAddPhotoForm } from "../hooks/useValidateAddPhotoForm";
import useCreatePhoto from "../hooks/useCreatePhoto";

type AddPhotoProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddPhoto = ({ setIsModalOpen }: AddPhotoProps) => {
  const [isLabelEmpty, setIsLabelEmpty] = React.useState(false);
  const [isLabelInvalid, setIsLabelInvalid] = React.useState(false);
  const [isUrlInvalid, setIsUrlInvalid] = React.useState(false);
  const { isNotBlank, isValidLabel, isValidUrl } = useValidateAddPhotoForm();
  const { createPhoto, errorResponse } = useCreatePhoto({
    onCreated: () => {
      setIsModalOpen((prev) => !prev);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const isLabelEmpty = !isNotBlank(formData.get("label") as string);
    const isLabelInvalid = !isValidLabel(formData.get("label") as string);
    const isUrlInvalid = await !isValidUrl(formData.get("url") as string);
    setIsLabelEmpty(isLabelEmpty);
    setIsLabelInvalid(isLabelInvalid);
    setIsUrlInvalid(isUrlInvalid);

    if (isLabelEmpty || isLabelInvalid || isUrlInvalid) return;
    await createPhoto(
      formData.get("label") as string,
      formData.get("url") as string
    );
  };

  return (
    <main>
      <section className="modal">
        <h1 className="modal__title">Add a new photo</h1>
        {errorResponse && (
          <p className="modal__error m-bottom">
            {errorResponse.message.map((e) => (
              <>
                <span>{e}</span>
                <br />
              </>
            ))}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <label className="modal__label" htmlFor="label">
            Label
          </label>
          <input
            className={
              ['modal__input',
              !isLabelEmpty && !isLabelInvalid && 'modal__input--valid',].join(' ')
            }
            type="text"
            id="label"
            name="label"
            placeholder="Suspendisse elit massa"
          />
          {isLabelEmpty && (
            <p className="modal__error">Label cannot be empty</p>
          )}
          {isLabelInvalid && (
            <p className="modal__error m-bottom">
              Label must be between 5 and 20 characters
            </p>
          )}
          <label className="modal__label" htmlFor="url">
            Photo url
          </label>
          <input
            className={
              ['modal__input',
              !isUrlInvalid && 'modal__input--valid',].join(' ')
            }
            type="text"
            id="url"
            name="url"
            placeholder="https://www.example.com"
          />
          {isUrlInvalid && <p className="modal__error m-bottom">Url is invalid</p>}
          <div className="btns">
            <button
              className="btns__cancel"
              type="button"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              Cancel
            </button>
            <button className="btns__submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

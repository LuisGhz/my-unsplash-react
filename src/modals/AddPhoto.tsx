import React from 'react';
import { createPortal } from "react-dom";
import './AddPhoto.css'
import { useValidateAddPhotoForm } from '../hooks/useValidateAddPhotoForm';


type AddPhotoProps = {
  isAddPhotoModalOpen: boolean;
  setIsAddPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const AddPhoto = ({ isAddPhotoModalOpen, setIsAddPhotoModalOpen }: AddPhotoProps) => {
  const { isValidLabel, isValidUrl } = useValidateAddPhotoForm();
  
  if (!isAddPhotoModalOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(isValidLabel(formData.get('label') as string), isValidUrl(formData.get('url') as string));
  }

  return createPortal(
    <main className="main">
      <section className="modal">
        <h1 className="modal__title">Add a new photo</h1>
        <form onSubmit={handleSubmit}>
          <label className="modal__label" htmlFor="label">Label</label>
          <input className="modal__input" type="text" id="label" name='label' placeholder="Suspendisse elit massa" />
          <label className="modal__label" htmlFor="url">Photo url</label>
          <input className="modal__input" type="text" id="url" name='url' placeholder="https://www.example.com" />
          <div className="btns">
          <button className="btns__cancel" type="button" onClick={() => setIsAddPhotoModalOpen(prev => !prev)}>Cancel</button>
          <button className="btns__submit" type="submit">Submit</button>
          </div>
        </form>
      </section>
    </main>,
    document.getElementById("modal")!
  );
};

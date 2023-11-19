import React from 'react';
import './form.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = ({ formTexts, setFormTexts, onSubmit, handlereset }) => {
  const handleTextChange = (index, value) => {
    const newTexts = [...formTexts];
    newTexts[index] = value;
    setFormTexts(newTexts);
  };


  return (
    <div className="comic-form-container">
      <form className="comic-form">
        {formTexts.map((text, index) => (
          <div key={index} className="form-row">
            {/* <label htmlFor={`scene${index + 1}`}>Scene {index + 1}</label> */}
            <textarea
              type="text"
              id={`scene${index + 1}`}
              name={`scene${index + 1}`}
              value={text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              autocomplete='on'
              placeholder={`Describe Scene ${index + 1} for the comic`}
            />
          </div>
        ))}
        <div className="form-row">
          <button className="comic-button" type="submit" onClick={onSubmit}>Generate Comic</button>
          <button className='comic-button reset' type="button" onClick={handlereset}>Reset</button>
        </div>
      </form>
    </div>
  );
};


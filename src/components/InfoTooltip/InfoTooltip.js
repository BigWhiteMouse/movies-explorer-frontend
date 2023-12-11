import React from "react";
import successIcon from "../../images/successIcon.png";
import errorIcon from "../../images/errorIcon.png";


function InfoTooltip({isOpen, onClose, isSuccess, errorStatus}) {

  function close(e){
    if (e.target.classList.contains('popup')) onClose();
  }

  return (
    <div className={`popup ${isOpen ? "popup_visible" : ""}`} onClick={close}>
      <div className="popup__content">
        <button type="reset" aria-label="Закрыть" className="popup__exit-button" onClick={onClose}/>
        <img
          src = {isSuccess ? successIcon : errorIcon}
          alt = {isSuccess ? "Успешно" : "Что-то пошло не так"}
          className="popup__icon"
        />
        <h2 className="popup__header">
          {isSuccess ? "Успешно" : `${errorStatus}`}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;

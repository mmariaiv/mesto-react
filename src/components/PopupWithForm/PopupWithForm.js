import React from "react";

function PopupWithForm(props) {
	return (
		<div
			className={`popup popup_${props.name} ${props.isOpen && `popup_opened`}`}
		>
			<div className="popup__container">
				<button
					type="button"
					className="popup__close-button"
					onClick={props.onClose}
				></button>
				<h2 className="popup__title">{props.title}</h2>
				<form
					name={props.name}
					className={`popup__form  popup__form_${props.name}`}
					noValidate
				>
					<fieldset className="popup__form-container">
						{props.children}
					</fieldset>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;

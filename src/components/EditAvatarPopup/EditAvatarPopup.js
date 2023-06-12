import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup(props) {
	const [userAvatar, setUserAvatar] = React.useState("");
	const userAvatarRef = React.useRef("");

	function handleAvatarChange(e) {
		setUserAvatar(e.target.value);
	}

	return (
		<PopupWithForm
			name="update-avatar"
			title="Обновить аватар"
			isOpen={props.isOpen}
			onClose={props.onClose}
			button="Сохранить"
		>
			<label className="popup__form-field">
				<input
					name="avatar"
					className="popup__input popup__input_type_link"
					id="avatar-input"
					placeholder="Ссылка на аватар"
					type="url"
					required
					onChange={handleAvatarChange}
				/>
				<span className="popup__input-error avatar-input-error"></span>
			</label>
		</PopupWithForm>
	);
}

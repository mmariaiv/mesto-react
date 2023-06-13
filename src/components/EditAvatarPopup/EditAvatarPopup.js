import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup(props) {
	const userAvatarRef = React.useRef("");

	function handleSubmit(e) {
		e.preventDefault();
		console.log(userAvatarRef.current.value);

		props.onUpdateAvatar({
			avatar: userAvatarRef.current.value,
		});

		// e.target.reset();
	}

	React.useEffect(() => {
		userAvatarRef.current.value = "";
	});

	return (
		<PopupWithForm
			name="update-avatar"
			title="Обновить аватар"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			button={props.isLoading ? "Сохранение..." : "Сохранить"}
		>
			<label className="popup__form-field">
				<input
					name="avatar"
					className="popup__input popup__input_type_link"
					id="avatar-input"
					placeholder="Ссылка на аватар"
					type="url"
					required
					ref={userAvatarRef}
				/>
				<span className="popup__input-error avatar-input-error"></span>
			</label>
		</PopupWithForm>
	);
}

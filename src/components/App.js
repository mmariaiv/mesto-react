import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);

	function handleCardClick(card) {
		return setSelectedCard(card);
	}

	function handleEditProfileClick() {
		return setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}

	function handleEditAvatarClick() {
		return setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}

	function handleAddPlaceClick() {
		return setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard(null);
	}

	return (
		<div className="page">
			<Header />
			<Main
				onEditAvatar={handleEditAvatarClick}
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onCardClick={handleCardClick}
			/>
			<Footer />

			<PopupWithForm
				name="edit-profile"
				title="Редактировать профиль"
				isOpen={isEditProfilePopupOpen}
				onClick={handleEditProfileClick}
				onClose={closeAllPopups}
			>
				<label className="popup__form-field">
					<input
						name="name"
						id="id-input"
						className="popup__input popup__input_type_name"
						placeholder="Введите имя"
						type="text"
						required
						minLength="2"
						maxLength="40"
					/>
					<span className="popup__input-error id-input-error"></span>
				</label>

				<label className="popup__form-field">
					<input
						name="about"
						id="bio-input"
						className="popup__input popup__input_type_bio"
						placeholder="Введите описание"
						type="text"
						required
						minLength="2"
						maxLength="200"
					/>
					<span className="popup__input-error bio-input-error"></span>
				</label>
				<button className="popup__submit-button" type="submit">
					Сохранить
				</button>
			</PopupWithForm>

			<PopupWithForm
				name="add-photo"
				title="Новое место"
				isOpen={isAddPlacePopupOpen}
				onClick={handleAddPlaceClick}
				onClose={closeAllPopups}
			>
				<label className="popup__form-field">
					<input
						name="picture-name"
						className="popup__input popup__input_type_picture-name"
						id="name-input"
						placeholder="Название"
						type="text"
						required
						minLength="2"
						maxLength="30"
					/>
					<span className="popup__input-error name-input-error"></span>
				</label>

				<label className="popup__form-field">
					<input
						name="link"
						className="popup__input popup__input_type_link"
						id="link-input"
						placeholder="Ссылка на картинку"
						type="url"
						required
					/>
					<span className="popup__input-error link-input-error"></span>
				</label>
				<button className="popup__submit-button" type="submit">
					Создать
				</button>
			</PopupWithForm>

			<PopupWithForm
				name="update-avatar"
				title="Обновить аватар"
				isOpen={isEditAvatarPopupOpen}
				onClick={handleEditAvatarClick}
				onClose={closeAllPopups}
			>
				<label className="popup__form-field">
					<input
						name="avatar"
						className="popup__input popup__input_type_link"
						id="avatar-input"
						placeholder="Ссылка на аватар"
						type="url"
						required
					/>
					<span className="popup__input-error avatar-input-error"></span>
				</label>
				<button className="popup__submit-button" type="submit">
					Сохранить
				</button>
			</PopupWithForm>

			<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			{/* 

			<div className="popup popup_image">
				<div className="popup__photo-container">
					<button type="button" className="popup__close-button"></button>
					<img src=" " alt="" className="popup__photo" />
					<h2 className="popup__description"></h2>
				</div>
			</div>

			<div className="popup popup_confirm">
				<div className="popup__container">
					<button type="button" className="popup__close-button"></button>
					<h2 className="popup__title">Вы уверены?</h2>
					<button className="popup__confirm-button" type="button">
						Да
					</button>
				</div>
			</div>

			*/}
		</div>
	);
}

export default App;

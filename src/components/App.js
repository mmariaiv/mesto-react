import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

import ImagePopup from "./ImagePopup/ImagePopup";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false);

	const [selectedCard, setSelectedCard] = React.useState(null);

	const [CurrentUser, setCurrentUser] = React.useState({
		userName: "",
		userDescription: "",
		userAvatar: "",
		_id: "",
	});

	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api
			.getUserInfo()
			.then((info) => {
				setCurrentUser({
					userName: info.name,
					userDescription: info.about,
					userAvatar: info.avatar,
					_id: info._id,
				});
			})
			.catch((err) => {
				console.log(err, "error in searching userInfo");
			});

		api
			.getInitialCards()
			.then((initialCards) => {
				setCards(initialCards);
			})
			.catch((err) => {
				console.log(err, "error in searching cards");
			});
	}, []);

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

	function handleCardDelete(card) {
		console.log(card);
		api.deleteCard(card._id).then((res) => {
			console.log(res);

			setCards((state) => {
				return state.filter((c) => card._id !== c._id);
			});
		});
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === CurrentUser._id);

		api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
			setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
		});
	}

	function handleUpdateUser(newUserInfo) {
		api
			.changeUserInfo(newUserInfo)
			.then((res) => {
				setCurrentUser({
					userName: res.name,
					userDescription: res.about,
					userAvatar: res.avatar,
					_id: res._id,
				});
			})
			.catch((err) => {
				console.log(err, "error in updating userInfo");
			});
	}

	function handleUpdateAvatar(newAvatarUrl) {
		api
			.changeAvatarPhoto(newAvatarUrl)
			.then((res) => {
				setCurrentUser({
					userName: res.name,
					userDescription: res.about,
					userAvatar: res.avatar,
					_id: res._id,
				});
			})
			.catch((err) => {
				console.log(err, "error in updating avatar");
			});
	}

	function handleAddPlace(newCardInfo) {
		api
			.addNewCard(newCardInfo)
			.then((res) => {
				setCards([res, ...cards]);
			})
			.catch((err) => {
				console.log(err, "error in adding new card");
			});
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard(null);
	}

	return (
		<CurrentUserContext.Provider value={CurrentUser}>
			<div className="page">
				<Header />
				<Main
					onEditAvatar={handleEditAvatarClick}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
					cards={cards}
				/>
				<Footer />

				<EditProfilePopup
					onClose={closeAllPopups}
					isOpen={isEditProfilePopupOpen}
					onUpdateUser={handleUpdateUser}
				/>

				<EditAvatarPopup
					onClose={closeAllPopups}
					isOpen={isEditAvatarPopupOpen}
					onUpdateAvatar={handleUpdateAvatar}
				/>

				<AddPlacePopup
					onClose={closeAllPopups}
					isOpen={isAddPlacePopupOpen}
					onAddPlace={handleAddPlace}
				/>

				{/* <PopupWithForm
					name="add-photo"
					title="Новое место"
					isOpen={isAddPlacePopupOpen}
					onClick={handleAddPlaceClick}
					onClose={closeAllPopups}
					button="Создать"
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
				</PopupWithForm> */}

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
		</CurrentUserContext.Provider>
	);
}

export default App;

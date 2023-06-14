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
import ConfirmDeletingPopup from "./ConfirmDeletingPopup/ConfirmDeletingPopup";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false);
	const [isConfirmDeletingPopupOpen, setIsConfirmDeletingPopupOpen] =
		React.useState(false);

	const [isLoading, setIsLoadingState] = React.useState(false);

	const [selectedCard, setSelectedCard] = React.useState(null);
	const [deletingCard, setDeletingCard] = React.useState(null);

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

	function handleCardDeleteCLick(card) {
		setDeletingCard(card);
		return setIsConfirmDeletingPopupOpen(!isConfirmDeletingPopupOpen);
	}

	function handleCardDelete(card) {
		setIsLoadingState(true);
		api
			.deleteCard(card._id)
			.then((res) => {
				setCards((state) => {
					return state.filter((c) => card._id !== c._id);
				});
			})
			.then(() => {
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err, "error in deleting card");
			})
			.finally(() => {
				setIsLoadingState(false);
			});
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === CurrentUser._id);

		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) =>
					state.map((c) => (c._id === card._id ? newCard : c))
				);
			})
			.catch((err) => {
				console.log(err, "error in cards setting");
			});
	}

	function handleUpdateUser(newUserInfo) {
		setIsLoadingState(true);
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
			.then(() => {
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err, "error in updating userInfo");
			})
			.finally(() => {
				setIsLoadingState(false);
			});
	}

	function handleUpdateAvatar(newAvatarUrl) {
		setIsLoadingState(true);
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
			.then(() => {
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err, "error in updating avatar");
			})
			.finally(() => {
				setIsLoadingState(false);
			});
	}

	function handleAddPlace(newCardInfo) {
		setIsLoadingState(true);
		api
			.addNewCard(newCardInfo)
			.then((res) => {
				setCards([res, ...cards]);
			})
			.then(() => {
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err, "error in adding new card");
			})
			.finally(() => {
				setIsLoadingState(false);
			});
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsConfirmDeletingPopupOpen(false);
		setSelectedCard(null);
		setDeletingCard(null);
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
					onCardDelete={handleCardDeleteCLick}
					cards={cards}
				/>
				<Footer />

				<EditProfilePopup
					onClose={closeAllPopups}
					isOpen={isEditProfilePopupOpen}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
				/>

				<EditAvatarPopup
					onClose={closeAllPopups}
					isOpen={isEditAvatarPopupOpen}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
				/>

				<AddPlacePopup
					onClose={closeAllPopups}
					isOpen={isAddPlacePopupOpen}
					onAddPlace={handleAddPlace}
					isLoading={isLoading}
				/>

				<ImagePopup card={selectedCard} onClose={closeAllPopups} />

				<ConfirmDeletingPopup
					onClose={closeAllPopups}
					isOpen={isConfirmDeletingPopupOpen}
					onConfirm={handleCardDelete}
					selectedCard={deletingCard}
					isLoading={isLoading}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;

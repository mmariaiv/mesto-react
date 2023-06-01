import React from "react";
import { api } from "../../utils/api";
import Card from "../Card/Card";

function Main(props) {
	const [userName, setUserName] = React.useState("");
	const [userDescription, setUserDescription] = React.useState("");
	const [userAvatar, setUserAvatar] = React.useState("");
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
			([info, initialCards]) => {
				setUserName(info.name);
				setUserDescription(info.about);
				setUserAvatar(info.avatar);
				setCards(initialCards);
			}
		);
	}, []);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__menu">
					<button
						className="profile__avatar-button"
						type="button"
						onClick={props.onEditAvatar}
					>
						<img
							src={userAvatar}
							alt="Аватар пользователя"
							className="profile__avatar"
						/>
					</button>
					<div className="profile__info">
						<h1 className="profile__name">{userName}</h1>
						<p className="profile__bio">{userDescription}</p>
						<button
							className="profile__edit-button"
							type="button"
							onClick={props.onEditProfile}
						></button>
					</div>
				</div>
				<button
					className="profile__add-button"
					type="button"
					onClick={props.onAddPlace}
				></button>
			</section>

			<section className="elements">
				{cards.map((newCard) => {
					return (
						<Card
							key={newCard._id}
							card={newCard}
							onCardClick={props.onCardClick}
						/>
					);
				})}
			</section>
		</main>
	);
}

export default Main;

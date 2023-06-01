import React from "react";

function Card({ card, onCardClick }) {
	function handleClick() {
		onCardClick(card);
	}

	return (
		<div className="element">
			<img
				src={card.link}
				alt={card.name}
				className="element__image"
				onClick={handleClick}
			/>
			<button className="element__delete-button"></button>
			<div className="element__description">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like-container">
					<button className="element__like-button" type="button"></button>
					<p className="element__like-quantity">{card.likes.length}</p>
				</div>
			</div>
		</div>
	);
}

export default Card;

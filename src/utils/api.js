class Api {
	constructor(options) {
		this.options = options;
	}

	getInitialCards() {
		return fetch(this.options.baseUrl + "/cards", {
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	getUserInfo() {
		return fetch(this.options.baseUrl + "/users/me", {
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	changeUserInfo(newUserInfo) {
		const headers = this.options.headers;
		headers["Content-Type"] = "application/json";

		return fetch(this.options.baseUrl + "/users/me", {
			method: "PATCH",
			headers: headers,
			body: JSON.stringify({
				name: newUserInfo.name,
				about: newUserInfo.about,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	addNewCard(item) {
		const headers = this.options.headers;
		headers["Content-Type"] = "application/json";

		return fetch(this.options.baseUrl + `/cards/`, {
			method: "POST",
			headers: headers,
			body: JSON.stringify({
				name: item.name,
				link: item.link,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	deleteCard(cardID) {
		return fetch(this.options.baseUrl + `/cards/${cardID}`, {
			method: "DELETE",
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	changeAvatarPhoto(link) {
		const headers = this.options.headers;
		headers["Content-Type"] = "application/json";

		return fetch(this.options.baseUrl + `/users/me/avatar`, {
			method: "PATCH",
			headers: headers,
			body: JSON.stringify(link),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	putLikeOnCard(cardId) {
		return fetch(this.options.baseUrl + `/cards/${cardId}/likes`, {
			method: "PUT",
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	deleteLikeOnCard(cardId) {
		return fetch(this.options.baseUrl + `/cards/${cardId}/likes`, {
			method: "DELETE",
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}
}

export const api = new Api({
	baseUrl: "https://nomoreparties.co/v1/cohort-65",
	headers: {
		authorization: "4015b49d-701b-4ec8-8c45-a790a9db8072",
	},
});

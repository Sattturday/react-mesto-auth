import { configApi } from './utils';

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this.baseUrl}${url}`, options).then(this._checkAnswer);
  }

  getUserInfo() {
    return this._request('/users/me', {
      headers: this.headers,
    });
  }

  setUserInfo({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  getInitialCards() {
    return this._request('/cards', {
      headers: this.headers,
    });
  }

  addCard({ name, link }) {
    return this._request('/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  _addLikeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    });
  }

  _deleteLikeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }

  toggleLikeCard(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLikeCard(cardId);
    } else {
      return this._addLikeCard(cardId);
    }
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }

  updateAvatar({ avatar }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
}

const api = new Api(configApi);

export default api;

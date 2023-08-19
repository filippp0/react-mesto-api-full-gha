class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
  }

  _request(url, options) {
    return fetch(`${this._url}${url}`, options)
      .then(this._checkResponse)
  }

  getInfo(token) {
    return this._request('/users/me', {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }


  setUserInfo(data, token) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.username,
        about: data.job,
      })
    })
  }

  getCards(token) {
    return this._request('/cards', {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  addCard(data, token) {
    return this._request('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      })
    })
  }

  setNewAvatar(data, token) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
  }

  deleteCard(cardId, token) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  deleteLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  addLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }
}

/*создаю экземпляр класса Api*/

const api = new Api({
  baseUrl: 'https://api.mesto-66.fil.nomoreparties.co',
});

export default api

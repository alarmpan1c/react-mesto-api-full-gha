class Api {
  constructor(options) {

    this._url = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status}`);
    }
  }
  _request(url, option) {
    return fetch(url, option).then(this._checkResponse)
  }

  getInfo() {
    return this._request(`${this._url}/users/me`, { headers: { authorization: this._token } })
  }
  getPicture() {
    return this._request(`${this._url}/cards`, { headers: { authorization: this._token } })
  }
  addHeartonServer(infoforServer) {
    return this._request(`${this._url}/cards/${infoforServer}/likes`, { method: 'PUT', headers: { authorization: this._token, 'Content-Type': 'application/json' }, })
  }
  eraseHeartonServer(infoforServer) {
    return this._request(`${this._url}/cards/${infoforServer}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
  }
  setInfoonServer(infoforServer) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: infoforServer.name,
        about: infoforServer.job
      })
    })
  }
  setAvataronServer(infoforServer) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: infoforServer.avatar,
      })
    })
  }
  eraseCardonServer(infoforServer) {
    return this._request(`${this._url}/cards/${infoforServer}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
  }
  addCardonServer(infoforServer) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: infoforServer.place,
        link: infoforServer.link
      })
    })
  }


}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '39c5dd3e-18c5-4109-bb7f-0a82c5dea405',
    'Content-Type': 'application/json'
  }
});

export default api;
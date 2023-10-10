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

  getInfo(token) {
    return this._request(`${this._url}/users/me`, { headers: { 
      authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } })
  }
  getPicture(token) {
    return this._request(`${this._url}/cards`, { headers: { 
      authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } })
  }
  addHeartonServer(infoforServer, token) {
    console.log(infoforServer, token)
    return fetch(`${this._url}/cards/${infoforServer}/likes`, {
      method: 'PUT', 
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      return res.json()
    })
  }
  eraseHeartonServer(infoforServer, token) {
    console.log(infoforServer, token)
    return this._request(`${this._url}/cards/${infoforServer}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
  }
  setInfoonServer(infoforServer, token) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: infoforServer.name,
        about: infoforServer.job
      })
    })
  }
  setAvataronServer(infoforServer, token) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: infoforServer.avatar,
      })
    })
  }
  eraseCardonServer(infoforServer, token) {
    return this._request(`${this._url}/cards/${infoforServer}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
  }
  addCardonServer(infoforServer, token) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
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
  baseUrl: 'https://api.varvara.maksimchuk.nomoredomainsrocks.ru',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;
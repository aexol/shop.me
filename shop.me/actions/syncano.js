import React from 'react'
import {
  s,
  setToken,
  getToken,
  getUsername,
  setUsername,
  removeUsername,
  removeToken
} from '../server/config'
import { castField, generateUniq } from './utils'
export const syncanoGeneric = ({ name, f }) => state => dispatch => {
  s.post(name).then(json => {
    dispatch(f)
  })
}
export const pullTokens = () => state => async dispatch => {
  let token = await getToken()
  let username = await getUsername()
  dispatch(state => ({
    ...state,
    token,
    username
  }))
}
export const syncanoSetModels = () => state => dispatch => {
  s.post('rest-framework/schema').then(json => {
    dispatch(state => ({
      ...state,
      models: json.map(m => ({
        ...m,
        fields: m.fields.map(f => castField(f))
      }))
    }))
  })
}
export const syncanoGetConfig = () => state => dispatch => {
  s.post('rest-framework/getconfig').then(json => {
    dispatch(state => ({
      ...state,
      config: json.config
    }))
  })
}
export const syncanoValidate = ({ username, token }) => state => dispatch => {
  dispatch(state=>({
    ...state,
    waiting:true
  }))
  s.post('rest-auth/validate', { username, token }).then(json => {
    if (json.valid) {
      s.setToken(token)
    } else {
      removeToken()
      removeUsername()
    }
    dispatch(state=>({
      ...state,
      waiting:false
    }))
    return dispatch(state => ({
      ...state,
      valid: json.valid
    }))
  })
}
export const syncanoRefreshToken = ({ username, token }) => state => dispatch => {
  s.post('rest-auth/refresh', { username, token }).then(json => {
    setToken(json.token)
    dispatch(state => ({
      ...state,
      valid: true,
      token: json.token
    }))
  })
}
export const syncanoLogin = ({ username, password }) => state => dispatch => {
  dispatch(state=>({
    ...state,
    waiting:true
  }))
  s.post('rest-auth/login', { username, password }).then(json => {
    setToken(json.token)
    setUsername(json.username)
    s.setToken(json.token)
    dispatch(state=>({
      ...state,
      waiting:false
    }))
    dispatch(state => ({
      ...state,
      username: json.username,
      token: json.token,
      valid: true
    }))
  }).catch(error => {
    dispatch(state=>({
      ...state,
      waiting:false
    }))
    dispatch(state => ({
      ...state,
      valid: false
    }))
  })
}
export const syncanoLogout = () => state => dispatch => {
  removeUsername()
  removeToken()
  dispatch(state => ({
    ...state,
    valid: null,
    token: ''
  }))
}
export const syncanoList = ({ model }) => state => dispatch => {
  s
    .get('rest-framework/list', {
      model
    })
    .then(json =>
      dispatch(state => ({
        ...state,
        [model]: json
      }))
    )
}
export const syncanoAdd = ({ model, data }) => state => dispatch => {
  const id = state[model].length + 1
  dispatch(state => ({
    ...state,
    [model]: [...state[model], { ...data, id }]
  }))
  s
    .post('rest-framework/add', {
      model,
      data
    })
    .then(json => {
      // dispatch the difference later
      dispatch(state => ({
        ...state,
        [model]: state[model].map(m => (m.id === id ? json : m))
      }))
    })
}
export const syncanoUpdate = ({ model, data, id }) => state => dispatch => {
  s
    .patch('rest-framework/update', {
      model,
      id,
      data
    })
    .then(json => {
      dispatch(state => ({
        ...state,
        [model]: [...state[model].map(o => (o.id === json.id ? json : o))]
      }))
    })
}
export const syncanoDelete = ({ model, id }) => state => dispatch => {
  s
    .patch('rest-framework/remove', {
      model,
      id
    })
    .then(json => {
      dispatch(state => ({
        ...state,
        [model]: state[model].filter(o => o.id !== parseInt(id))
      }))
    })
}
export const syncanoRestFrameworkConfigure = data => state => (
  dispatch,
  getState
) => {
  s.post('rest-framework/configure', { config: data }).then(json => {
    dispatch(state => ({
      ...state,
      config: json.config
    }))
  })
}

import { s } from '../server/config'
import { syncanoLogin } from "./syncano"
import { Permissions, Notifications } from 'expo';

export const registerForPushNotificationsAsync = () => state => async (dispatch) => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return;
  }
  let token = await Notifications.getExpoPushTokenAsync();
  s.post('expo-push/register', { token }).then(json => {
    dispatch(
      state => ({
        ...state,
        registeredForPush: 'ok'
      })
    )
  })
}
export const register = ({ district, username, password, firstName, lastName, phone }) => state => dispatch => {
  dispatch(wait())
  s.post('shopme/register', { district, username, password, firstName, lastName, phone, city: 'Białystok' }).then(json => {
    dispatch(endWait())
    dispatch(syncanoLogin({ username, password }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const getme = () => state => dispatch => {
  dispatch(wait())
  s.post('shopme/me', ).then(me => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      me
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const cities = () => state => dispatch => {
  dispatch(wait())
  s.post('shopme/cities').then(json => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      cities: json
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const list = () => state => dispatch => {
  dispatch(wait())
  s.post('shopme/list').then(allshopme => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      allshopme
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const profile = () => state => dispatch => {
  dispatch(wait())
  s.post('shopme/profile').then(profile => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      profile
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const createShopme = ({ description, value }) => state => dispatch => {
  dispatch(wait())
  s.post('shopme/createShopme', { description, value }).then(shopme => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      myShopme: [...state.myShopme, shopme]
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const myShopmes = () => state => dispatch => {
  dispatch(wait())
  s.post('shopme/myShopmes').then(myShopme => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      myShopme
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const offeredme = () => state => dispatch => {
  dispatch(wait())
  s.post('shopme/offeredme').then(offers => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      offers
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const rateOffer = ({ shopme, rating }) => state => dispatch => {
  dispatch(wait())
  s.post('shopme/rateOffer', { shopme, rating }).then(review => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      reviews: [...state.reviews, review]
    }))
    dispatch(myShopmes())
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const ioffered = () => state => dispatch => {
  dispatch(wait())
  s.post('shopme/ioffered').then(myoffers => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      myoffers: myoffers.offers,
      doingShopme: myoffers.shopme
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const offer = ({ shopme }) => state => dispatch => {
  dispatch(wait())
  s.post('shopme/offer', { shopme }).then(myoffer => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      myoffers: [...state.myoffers, myoffer]
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const realisingShopmes = () => state => dispatch => {
  dispatch(wait())
  s.post('shopme/realisingShopmes').then(realising => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      realising
    }))
  }).catch(error => {
    dispatch(endWait())
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const acceptOffer = ({ offer }) => state => dispatch => {
  dispatch(wait())
  s.post('shopme/acceptOffer', { offer }).then(json => {
    dispatch(endWait())
    dispatch(myShopmes())
  }).catch(error => {
    dispatch(state => ({
      ...state,
      error
    }))
  })
}
export const wait = name => state => dispatch => {
  dispatch(state => ({
    ...state,
    waiting: true
  }))
}
export const endWait = name => state => dispatch => {
  dispatch(state => ({
    ...state,
    waiting: false
  }))
}

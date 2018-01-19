import Syncano from 'syncano-client'
import {AsyncStorage} from 'react-native'
export const INSTANCE_NAME = 'shopme'
export const s = new Syncano(INSTANCE_NAME)
export const removeToken = () => {
  AsyncStorage.removeItem(`${INSTANCE_NAME}-token`)
}
export const getToken = async () =>
  await AsyncStorage.getItem(`${INSTANCE_NAME}-token`)
export const setToken = async value => {
  await AsyncStorage.setItem(`${INSTANCE_NAME}-token`, value)
}

export const removeUsername = async () => {
  await AsyncStorage.removeItem(`${INSTANCE_NAME}-username`)
}
export const getUsername = async () =>
  await AsyncStorage.getItem(`${INSTANCE_NAME}-username`)
export const setUsername = async value => {
  await AsyncStorage.setItem(`${INSTANCE_NAME}-username`, value)
}

import React from 'react'
import MainScreen from './screens/MainScreen'
import {DrawerNavigator} from 'react-navigation'

const Navigation = DrawerNavigator({
  Main: {screen: MainScreen}
})

const App = () => <Navigation />

export default App

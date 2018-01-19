import React from 'react'
import { Button, View, TextInput } from 'react-native'
import Store, { thunk } from 'repatch'
import { Provider } from 'react-redux'
import { DrawerNavigator } from 'react-navigation'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Shopme from './Shopme'
import Realising from './Realising'
import Create from './Create'
import Details from './Details'
let store = new Store({ waiting: false, myoffers: [], myShopme: [], reviews: [], shopme: [] }).addMiddleware(thunk)

const Navigation = DrawerNavigator({
    Login: { screen: Login },
    Details: { screen: Details },
    Register: { screen: Register },
    Profile: { screen: Profile },
    Shopme: { screen: Shopme },
    Realising: { screen: Realising },
    Create: { screen: Create }
})

class MainScreen extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column'
                }}
            >
                <Provider store={store}>
                    <Navigation navigation={this.props.navigation} />
                </Provider>
            </View>
        )
    }
}
MainScreen.router = Navigation.router
export default MainScreen

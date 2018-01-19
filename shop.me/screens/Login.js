import React, { PropTypes } from 'react'
import { Button, View, TextInput, Text } from 'react-native'
import { MyInput, MyButton, Loading } from '../components'
import { connect } from 'react-redux'
import {
    syncanoLogin,
    syncanoValidate,
    pullTokens,
    syncanoList,
    syncanoLogout,
    registerForPushNotificationsAsync,
    getme
} from '../actions'
@connect(
    state => ({
        valid: state.valid,
        token: state.token,
        username: state.username,
        waiting: state.waiting,
        restauracja: state.restauracja
    }),
    {
        syncanoLogin,
        syncanoValidate,
        pullTokens,
        syncanoList,
        registerForPushNotificationsAsync,
        syncanoLogout,
        getme
    }
)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    componentDidMount() {
        const { token, valid, pullTokens } = this.props
        pullTokens()
    }
    componentDidUpdate(prevProps) {
        const { navigate } = this.props.navigation
        const { valid, token, username, syncanoValidate, registerForPushNotificationsAsync, getme } = this.props
        if (valid) {
            registerForPushNotificationsAsync()
            getme()
            navigate('Shopme')
        }
        if (token && !valid) {
            syncanoValidate({
                token,
                username
            })
        }
    }
    login = () => {
        const { username, password } = this.state
        const { syncanoLogin } = this.props
        syncanoLogin({
            username,
            password
        })
    }
    logout = () => {
        const { syncanoLogout } = this.props
        syncanoLogout()
    }
    render() {
        const { valid, waiting } = this.props
        const { username, password } = this.state
        const { navigate } = this.props.navigation
        if (waiting) {
            return <Loading />
        }
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {(!valid || valid === null) &&
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MyInput
                            value={username}
                            onChangeText={username => {
                                this.setState({ username })
                            }}
                            placeholder='username'
                        />
                        <MyInput
                            value={password}
                            onChangeText={password => {
                                this.setState({ password })
                            }}
                            secureTextEntry
                            placeholder='password'
                        />
                        {valid === false && <Text style={{ padding: 10, color: "#D40" }}>Zła nazwa użytkownika lub hasło</Text>}
                        <MyButton
                            title='Login'
                            onPress={() => {
                                this.login()
                            }}
                        />
                        <Text>Nie masz konta?</Text>
                        <MyButton title='Zarejestruj się' onPress={() => { navigate('Register') }} />
                    </View>
                }
                {valid &&
                    <MyButton
                        title='Log out'
                        onPress={() => {
                            this.logout()
                        }}
                    />
                }
            </View>
        )
    }
}
export default Login

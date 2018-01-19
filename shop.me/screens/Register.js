import React from 'react'
import { View, Text } from 'react-native'
import { MyInput, MyButton, Loading } from '../components'
import { connect } from 'react-redux'
import * as actions from '../actions'

@connect(
    state => ({
        ...state
    }),
    {
        ...actions
    }
)
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidUpdate(prevProps) {
        const { navigate } = this.props.navigation
        const { valid, token, username, syncanoValidate, registerForPushNotificationsAsync } = this.props
        if (valid) {
            navigate('Shopme')
        }
    }
    register = () => {
        const { register } = this.props
        const { username, password, district, firstName, lastName, phone } = this.state
        let allFields = [username, password, district, firstName, lastName, phone]
        console.log(allFields)
        if (allFields.indexOf(undefined) !== -1 || allFields.indexOf('') !== -1) {
            console.log("cant register")
            return
        }
        register({ username, password, district, firstName, lastName, phone })
    }
    render() {
        const { error, waiting } = this.props
        const { username, password, district, firstName, lastName, phone } = this.state
        if(waiting){
            return <Loading />
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
                <MyInput value={username} placeholder="login" onChangeText={(username) => {
                    this.setState({
                        username
                    })
                }} />
                <MyInput value={password} placeholder="hasło" onChangeText={(password) => {
                    this.setState({
                        password
                    })
                }} />
                <MyInput value={district} placeholder="dzielnica" onChangeText={(district) => {
                    this.setState({
                        district
                    })
                }} />
                <MyInput value={firstName} placeholder="imie" onChangeText={(firstName) => {
                    this.setState({
                        firstName
                    })
                }} />
                <MyInput value={lastName} placeholder="nazwisko" onChangeText={(lastName) => {
                    this.setState({
                        lastName
                    })
                }} />
                <MyInput value={phone} placeholder="telefon" onChangeText={(phone) => {
                    this.setState({
                        phone
                    })
                }} />
                {error && <Text>{error.message}</Text>}
                <MyButton title="Zarejestruj się" onPress={this.register} />
            </View>
        )
    }
}
export default Register
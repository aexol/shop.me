import React from 'react'
import { View } from 'react-native'
import { MyInput, MyButton } from "../components";
import { connect } from "react-redux";
import * as actions from '../actions'

@connect(
    state => ({
        ...state
    }),
    {
        ...actions
    }
)
class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: "2 kilo jabłek, 3 kilo ziemniaków, 2 wody niegazowane muszyna 1,5l, 3 batoniki mars, kilo cebuli, sałata",
            value: "22"
        }
    }
    add = () => {
        const {
            createShopme
        } = this.props
        const { description, value } = this.state
        const { navigate } = this.props.navigation
        createShopme({
            description,
            value
        })
        navigate("Details")
    }
    render() {
        const { description, value } = this.state
        const { waiting } = this.props
        if (waiting) {
            return <Loading />
        }
        return (
            <View style={{ flex: 1, paddingTop: 50 }}>
                <MyInput value={description} multiline={true} placeholder="opis" onChangeText={(description) => {
                    this.setState({
                        description
                    })
                }} />
                <MyInput value={value} placeholder="cena(około)" onChangeText={(value) => {
                    this.setState({
                        value
                    })
                }} />
                <MyButton title='Dodaj prośbę o zakupy' onPress={this.add} />
            </View>
        )
    }
}
export default Create
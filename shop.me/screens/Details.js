import React from 'react'
import { View, Alert } from 'react-native'
import { connect } from "react-redux"
import * as actions from "../actions"
import { MyShopmeTile, Loading } from "../components"
import { offeredme, wait } from '../actions';

@connect(
    state => ({
        ...state
    }),
    {
        ...actions
    }
)
class Details extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ratings : {}
        }
    }
    rate = (shopme,rating) => {
        this.setState({
            ratings:{
                ...this.state.ratings,
                [shopme]:rating
            }
        })
    }
    componentWillMount() {
        const {
            myShopmes,
            offeredme
        } = this.props
        myShopmes()
        offeredme()
    }
    render() {
        const { myShopme, offers, acceptOffer, waiting,rateOffer } = this.props
        if (!myShopme || !offers || waiting) {
            return (
                <Loading />
            )
        }
        let renderShopmes = myShopme.map(s => ({
            ...s,
            offers: offers.filter(o => o.shopme === s.id)
        }))
        return (
            <View style={{ paddingTop: 50 }}>
                {renderShopmes.map(a => (
                    <MyShopmeTile my={true}
                        offerPress={(offerId) => {
                            Alert.alert(
                                'Czy chcesz zaakcptować pomoc od tej osoby?',
                                '',
                                [
                                    { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                                    {
                                        text: 'OK', onPress: () => {
                                            acceptOffer({ offer: offerId })
                                        }
                                    }
                                ],
                                { cancelable: false }
                            )
                        }}
                        ratePress={(shopme) => {
                            Alert.alert(
                                'Czy chcesz potwierdzić zakupy?',
                                `Wystawiasz ocenę ${this.state.ratings[shopme] || 3}/5`,
                                [
                                    { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                                    {
                                        text: 'OK', onPress: () => {
                                            rateOffer({shopme,rating:this.state.ratings[shopme]})
                                        }
                                    }
                                ],
                                { cancelable: false }
                            )
                        }}
                        rate = {this.rate}
                        onPress={() => {
                        }} key={a.id} {...a} />
                ))}
            </View>
        )
    }
}
export default Details
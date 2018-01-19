import React from 'react'
import { View } from 'react-native'
import { connect } from "react-redux";
import * as actions from "../actions";
import { OfferShopmeTile, Loading } from "../components";
@connect(
    state => ({
        ...state
    }),
    {
        ...actions
    }
)
class Realising extends React.Component {
    componentWillMount() {
        const {
            ioffered,
        } = this.props
        ioffered()
    }
    render() {
        const { myoffers, doingShopme, waiting} = this.props
        if (!doingShopme || waiting) {
            return (
                <Loading />
            )
        }
        let renderShopmes = doingShopme.map(s => ({
            ...s,
            myoffers: myoffers.filter(o => o.shopme === s.id)
        }))
        console.log(renderShopmes)
        return (
            <View style={{ paddingTop: 50 }}>
                {renderShopmes.map(a => (
                    <OfferShopmeTile onPress={() => {
                    }} key={a.id} {...a} />
                ))}
            </View>
        )
    }
}
export default Realising
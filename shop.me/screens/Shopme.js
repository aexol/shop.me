import React from 'react'
import { View, Alert, Text } from 'react-native'
import { connect } from "react-redux";
import * as actions from '../actions'
import { ShopmeTile, Loading } from "../components";
@connect(
  state => ({
    ...state
  }), {
    ...actions
  }
)
class Shopme extends React.Component {
  componentWillMount() {
    const { list } = this.props
    list()
  }
  render() {
    const { allshopme, offer, waiting, me } = this.props
    if (!allshopme || waiting || !me) {
      return <Loading />
    }
    let renderedShopme = allshopme.filter(s => s.user !== me.id)
    return (
      <View style={{ paddingTop: 50 }}>
        {!renderedShopme.length && <Text style={{padding:20}}>
          {`Nie ma zadnych ofert`}
        </Text>}
        {renderedShopme.map(a => (
          <ShopmeTile onPress={() => {
            Alert.alert(
              'Czy chcesz pomóc tej osobie?',
              '(po kliknięciu TAK ta osoba musi zaakceptować)',
              [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                {
                  text: 'OK', onPress: () => {
                    offer({ shopme: a.id })
                  }
                },
              ],
              { cancelable: false }
            )
          }} key={a.id} {...a} />
        ))}
      </View>
    )
  }
}
export default Shopme
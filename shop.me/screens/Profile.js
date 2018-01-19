import React from 'react'
import { View } from 'react-native'

class Profile extends React.Component {
    render() {
        const { waiting } = this.props
        if (waiting) {
            return <Loading />
        }
        return (
            <View>
            </View>
        )
    }
}
export default Profile
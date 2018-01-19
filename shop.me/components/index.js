import React, { PropTypes } from 'react'
import {
    TextInput,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    View,
    Text
} from 'react-native'
import { Rating } from 'react-native-ratings';
import call from '../utils/call'
export const MyInput = props => (
    <TextInput
        style={{
            padding: 10,
            fontSize: 14,
            backgroundColor: '#fff',
            width: 320,
            margin: 10
        }}
        {...props}
    />
)
export const MyButton = ({ title, onPress, style = {}, ...props }) => (
    <TouchableOpacity
        style={{ backgroundColor: '#ddd', padding: 20, ...style }}
        onPress={onPress}
        {...props}
    >
        <Text style={{ color: '#0ae', fontSize: 24, textAlign: 'center' }}>
            {title}
        </Text>
    </TouchableOpacity>
)
const BaseShopmeTile = ({ description, value, city, district, status }) => (
    <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Text style={{ marginBottom: 5 }}>
            {description}
        </Text>
        <Text style={{ color: '#444' }}>
            {`${city} - ${district}, koszt: ${value}zł`}
        </Text>
    </View>
)
const HelpButton = ({ onPress }) => (
    <TouchableOpacity onPress={() => {
        onPress()
    }} style={{ marginLeft: 10, width: 80, height: 80, justifyContent: 'center', backgroundColor: '#0ae', display: 'flex', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>
            POMÓŻ
        </Text>
    </TouchableOpacity>
)
const StatusDisplay = ({ status }) => (
    <TouchableOpacity onPress={() => {
        onPress()
    }} style={{
        marginLeft: 10, width: 80, height: 80, justifyContent: 'center', backgroundColor: {
            open: '#BA0',
            accepted: '#0AE',
            rated: '#0A0'
        }[status], display: 'flex', alignItems: 'center'
    }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>
            {{
                open: 'Oczekuje na oferty',
                accepted: 'W trakcie realizacji',
                rated: 'Zakończone'
            }[status]}
        </Text>
    </TouchableOpacity>
)
const StatusDisplay2 = ({ status }) => (
    <TouchableOpacity onPress={() => {
        onPress()
    }} style={{
        marginLeft: 10, width: 80, height: 80, justifyContent: 'center', backgroundColor: {
            open: '#BA0',
            accepted: '#0AE',
            rated: '#0A0'
        }[status], display: 'flex', alignItems: 'center'
    }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>
            {{
                open: 'Oczekuje na akceptacje',
                accepted: 'Do dzieła',
                rated: 'Zakończone'
            }[status]}
        </Text>
    </TouchableOpacity>
)
export const ShopmeTile = ({ my, description, value, city, district, onPress, status }) => (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    }}>
        <BaseShopmeTile description={description} city={city} district={district} status={status} value={value} />
        <HelpButton onPress={onPress} />
    </View>
)
export const MyShopmeTile = ({ my,id, description, value, city, district, onPress, status, offers, offerPress, ratePress, rate }) => (
    <View style={{

        padding: 20
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <BaseShopmeTile description={description} city={city} district={district} status={status} value={value} />
            <StatusDisplay status={status} />
        </View>
        {status === 'accepted' && offers.filter(o => o.accepted).map(o => (
            <View key={o.id}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 1,
                    paddingVertical: 10
                }}>
                    <Text style={{ flex: 1 }}>{`${o.profile.firstName} realizuje twoje zakupy`}</Text>
                    <TouchableOpacity style={{
                        width: 80, height: 40, justifyContent: 'center', marginLeft: 10, backgroundColor: '#0A0'
                    }} onPress={() => {
                        call({
                            number: o.profile.phone,
                            prompt: true
                        })
                    }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Zadzwoń</Text>
                    </TouchableOpacity>
                </View>
                <View key={o.id} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 1,
                    paddingVertical: 10
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Rating
                            type='heart'
                            ratingCount={5}
                            imageSize={30}
                            onFinishRating={(rating)=>{
                                rate(id,rating)
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{
                        width: 80, height: 40, justifyContent: 'center', marginLeft: 10, backgroundColor: '#0A0'
                    }} onPress={() => {
                        ratePress(id)
                    }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Zakończ i oceń</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ))}
        {status === 'open' && offers.map(o => (
            <View key={o.id} style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
                paddingVertical: 10
            }}>
                <Text style={{ flex: 1 }}>{`${o.profile.firstName} zaoferował pomoc`}</Text>
                <TouchableOpacity style={{
                    width: 80, height: 40, justifyContent: 'center', marginLeft: 10, backgroundColor: '#0A0'
                }} onPress={() => {
                    offerPress(o.id)
                }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Akceptuj</Text>
                </TouchableOpacity>
            </View>
        ))}
    </View>
)
export const OfferShopmeTile = ({ my, description, profile, value, city, district, onPress, status, myoffers }) => (
    <View style={{
        padding:20
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <BaseShopmeTile description={description} city={city} district={district} status={status} value={value} />
            <StatusDisplay2 status={status} />
        </View>
        
        {status === 'accepted' && myoffers.filter(o => o.accepted).map(o => (
            <View key={o.id}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 1,
                    paddingVertical: 10
                }}>
                    <Text style={{ flex: 1 }}>{`Realizuj te zakupy`}</Text>
                    <TouchableOpacity style={{
                        width: 80, height: 40, justifyContent: 'center', marginLeft: 10, backgroundColor: '#0A0'
                    }} onPress={() => {
                        call({
                            number: profile.phone,
                            prompt: true
                        })
                    }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Zadzwoń</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ))}
    </View>
)
export const Loading = props => (
    <View
        style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
        }}
    >
        <ActivityIndicator {...props} />
    </View>
)

import Expo from 'expo-server-sdk'
import Server from '@syncano/core'
import fetch from 'node-fetch';
import { isNull } from 'util';
const BASE_URL = 'https://exp.host';
const BASE_API_URL = `${BASE_URL}/--/api/v2`;
const DEFAULT_HEADERS = {
    'accept': 'application/json',
    'accept-encoding': 'gzip, deflate',
    'content-type': 'application/json'
}
const sendIt = async messages => new Promise((resolve, reject) => {
    fetch(`${BASE_API_URL}/push/send`, {
        headers: DEFAULT_HEADERS,
        method: 'POST',
        body: JSON.stringify(messages)
    }).then(res => {
        resolve("ok")
    }).catch(error => {
        reject(error)
    })
    setTimeout(() => {
        resolve("again")
    }, 2000);
})
const sender = async messages => {
    let res = await sendIt(messages)
    if (res !== "ok") {
        await sender(messages)
    }
    return true
}
export default async (ctx, tokens) => {
    const { data, response } = Server(ctx)
    try {
        const { title, body, sound = "default", data: pushData } = ctx.args
        let expo = new Expo();
        let messages = [];
        for (let pushToken of tokens) {
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }
            messages.push({
                body,
                to: pushToken,
                title,
                sound,
                data: pushData
            })
        }
        let res = await sender(messages)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
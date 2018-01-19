import Server from '@syncano/core'
import { CITY } from "./city"
export default async ctx => {
    try {
        const { data, response } = Server(ctx)
        return response.json(CITY)
    } catch ({ message }) {
        return response.json(message, 400)
    }
}
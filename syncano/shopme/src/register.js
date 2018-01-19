import Server from '@syncano/core'
import { CITY } from "./city";
export default async ctx => {
    const { data, response, socket, users } = Server(ctx)
    try {
        const { city, district, firstName, lastName, phone, username, password } = ctx.args
        let newUser = await socket.post('rest-auth/register', {
            username,
            password
        })
        if (CITY.indexOf(city) === -1) {
            throw new Error("We dont support that city yet")
        }
        
        let profile = await data.profile.create({
            city,
            district,
            firstName,
            lastName,
            phone,
            user: (await users.where('username', username).firstOrFail()).id
        })
        return response.json({ profile, token: newUser.user_key, username })
    } catch (error) {
        console.log(error)
        return response.json(error.message, 400)
    }
}
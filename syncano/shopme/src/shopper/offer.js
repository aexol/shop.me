
import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        let { shopme } = ctx.args
        shopme = await data.shopme.find(shopme)
        if (shopme.status !== 'open') {
            throw new Error("Cant touch this")
        }

        let offer = await data.offer.create({
            shopme: shopme.id,
            user: user.id,
            to: shopme.user,
            accepted: false
        })
        return response.json(offer)
    } catch (error) {
        console.log(error)
        return response.json(error.message, 400)
    }
}
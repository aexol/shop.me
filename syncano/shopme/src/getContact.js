import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        let { shopme } = ctx.args
        shopme = await data.shopme.find(shopme)
        let offer = await data.offer.where('shopme', shopme).where('accepted', true).firstOrFail()
        if (user.id !== shopme.user && user.id !== offer.user) {
            throw new Error("Forbidden")
        }
        let person = await data.profile.where('user', shopme.user).firstOrFail()
        let shopper = await data.profile.where('user', offer.user).firstOrFail()
        return response.json({
            person,
            shopper
        })
    } catch ({ message }) {
        return response.json(message, 400)
    }
}
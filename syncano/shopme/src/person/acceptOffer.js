import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        let { offer } = ctx.args
        offer = await data.offer.find(offer)
        let shopme = await data.shopme.find(offer.shopme)
        if (shopme.user !== user.id) {
            throw new Error("Forbidden")
        }
        
        shopme = await data.shopme.update(shopme.id, {
            status: 'accepted'
        })
        offer = await data.offer.update(offer.id, {
            accepted: true
        })
        return response.json({
            shopme,
            offer
        })
    } catch ({ message }) {
        return response.json(message, 400)
    }
}
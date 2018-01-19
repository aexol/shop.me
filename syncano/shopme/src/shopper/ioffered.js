import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        const offers = await data.offer.where('user', user.id).list()
        let shopme = await data.shopme.find(offers.map(o => o.shopme))
        let acceptedOffers = offers.filter(o => o.accepted)
        let profiles = shopme.filter( s=> acceptedOffers.map( o=> o.shopme ).indexOf(s.id) !== -1).map(s=> s.user)
        profiles = await data.profile.where('user', 'in', profiles).list()
        shopme = shopme.map(o => ({
            ...o,
            profile: o.status === 'accepted' ? profiles.find(p => p.user === o.user) : undefined
        }))
        return response.json({offers,shopme})
    } catch (error) {
        console.log(error)
        return response.json(error.message, 400)
    }
}
import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        const { description, value } = ctx.args
        if (!user) {
            throw new Error("please login")
        }

        const profile = await data.profile.where('user', user.id).firstOrFail()
        const shopme = await data.shopme.create({
            description,
            user:user.id,
            value,
            status: 'open',
            city: profile.city,
            district: profile.district
        })
        return response.json(shopme)
    } catch ({ message }) {
        return response.json(message, 400)
    }
}
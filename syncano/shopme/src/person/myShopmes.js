import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        const shopme = await data.shopme.where('user', user.id).list()
        return response.json(shopme)
    } catch ({ message }) {
        return response.json(message, 400)
    }
}
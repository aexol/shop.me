import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        return response.json({ id: user.id })
    } catch ({ message }) {
        return response.json(message, 400)
    }
}
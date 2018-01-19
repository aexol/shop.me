import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        const profile = await data.profile.where('user', user.id).firstOrFail()
        
        return response.json(profile)
    } catch ({ message }) {
        return response.json({ message }, 400)
    }
}
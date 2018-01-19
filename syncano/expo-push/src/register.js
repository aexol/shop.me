import Server from 'syncano-server'
export default async ctx => {
    const { users, response, data } = Server(ctx)
    try {
        const { user: { id: user = null } } = ctx.meta
        const { token } = ctx.args
        const expoDevice = await data.expoDevice.updateOrCreate(
            {
                expoPushToken: token
            },
            {
                user,
            }
        )
        return response.json({
            message: 'registered'
        })
    } catch (error) {
        console.log(error)
        return response.json(error.message, 400)
    }
}
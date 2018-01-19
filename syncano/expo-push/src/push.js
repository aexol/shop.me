import Server from '@syncano/core'
import send from './send'
export default async ctx => {
    const { response, data } = Server(ctx)
    const {
      admin
    } = ctx.meta
    let {
      devices
    } = ctx.args
    try {
        if (!admin) {
            throw new Error("Admin only socket")
        }
        if (!devices) {
            devices = await data.expoDevice.list()
        } else {
            devices = await data.expoDevice.find(Array.isArray(devices) ? devices : [devices])
        }
        const isSent = await send(ctx, devices)
        if (!isSent) {
            return response.json({ message: "Error sending pushes" }, 400)
        }
        return response.json({ message: "All pushes sent" })
    } catch ({ message }) {
        return response.json(message, 403)
    }
}
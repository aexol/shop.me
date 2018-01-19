import Server from '@syncano/core'
export default async ctx => {
  const { data, response } = Server(ctx)
  try {
    const { user } = ctx.meta
    const offers = await data.offer.where('user', user.id).list()

    return response.json()
  } catch ({ message }) {
    return response.json(message, 400)
  }
}
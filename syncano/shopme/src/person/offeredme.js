import Server from '@syncano/core'
export default async ctx => {
  const { data, response, users } = Server(ctx)
  try {
    const { user } = ctx.meta
    let offers = await data.offer.where('to', user.id).list()
    let profiles = await data.profile.where('user', 'in', offers.map(o => o.user)).list()
    offers = offers.map(o => ({
      ...o,
      profile: profiles.find(p => p.user === o.user)
    }))
    return response.json(offers)
  } catch ({ message }) {
    return response.json(message, 400)
  }
}
import Server from '@syncano/core'
export default async ctx => {
  const { data, response } = Server(ctx)
  try {
    const { city } = ctx.args
    const shopme = await data.shopme.where('status', 'open').where('city', city).list()
    
    return response.json(shopme)
  } catch ({ message }) {
    return response.json(message, 400)
  }
}
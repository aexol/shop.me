import Server from '@syncano/core'
export default async ctx => {
    const { data, response } = Server(ctx)
    try {
        const { user } = ctx.meta
        let { shopme, rating } = ctx.args
        shopme = await data.shopme.find(shopme)
        if (shopme.user !== user.id || shopme.status === 'rated') {
            throw new Error("Forbidden")
        }
        let review = await data.review.create({
            shopme:shopme.id,
            rating
        })
        shopme = await data.shopme.update(shopme.id, {
            status: 'rated'
        })
        return response.json(review)
    } catch (error) {
        console.log(error)
        return response.json(error.message, 400)
    }
}
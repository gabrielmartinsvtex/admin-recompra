export async function handleGetOrders(ctx: Context, next: () => Promise<any>) {
  try {
    const { clients } = ctx
    const { email } = ctx.vtex.route.params
    const data = await clients.ordersClient.getOrder(email as string)

    ctx.body = data
    ctx.status = 200
  } catch (error) {
    ctx.status = error.status || error.response?.status || 500
    console.log(`Error 2: ${error}`)
  }

  await next()
}

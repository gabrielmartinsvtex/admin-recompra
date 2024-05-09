import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

class OrdersClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    console.log(context, "context")
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        ...options?.headers,
        "Cache-Control": "no-cache",
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  public async getOrder(email: string): Promise<any> {
    try {
      return this.http.get(`/api/oms/pvt/orders?q=${email}`)
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }
}

export { OrdersClient }

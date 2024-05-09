import { IOClients } from '@vtex/api'

import { OrdersClient } from './getOrders'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get ordersClient() {
    return this.getOrSet('ordersClient', OrdersClient)
  }
}

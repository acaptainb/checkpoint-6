import { reactive } from 'vue'
import { Event } from './models/Event.js'
import { Comment } from './models/Comment.js'
import { Ticket, TicketEvent, TicketProfile } from './models/Ticket.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/

  account: null,
  /**  @type {Event[]} */
  events: [],
  /**  @type {Event} */
  activeEvents: null,
  /**  @type {Comment[]} */
  comments: [],
  /**  @type {TicketProfile[]} */
  ticketProfile: [],
  /**  @type {TicketEvent[]} */
  ticketEvent: [],

})

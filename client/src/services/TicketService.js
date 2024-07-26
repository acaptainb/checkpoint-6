import { AppState } from "../AppState.js"
import { Ticket, TicketEvent, TicketProfile } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketService {
    async getaccountticketevent() {
        const response = await api.get('account/tickets')
        logger.log('getting acc tickets', response.data)
        const eventtickets = response.data.map(ticketData => new TicketEvent(ticketData))
        AppState.ticketEvent = eventtickets
    }
    async getEventTicketsforEvent(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('event tickets', response.data)
        const ticketprofiles = response.data.map(ticketdata => new TicketProfile(ticketdata))
        AppState.ticketProfile = ticketprofiles
    }

}
export const ticketService = new TicketService()
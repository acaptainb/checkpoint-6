import App from "../App.vue"
import { AppState } from "../AppState.js"
import { Ticket, TicketEvent, TicketProfile } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketService {
    async deleteTicket(ticketId) {
        const response = await api.delete(`api/tickets/${ticketId}`)
        logger.log('ticket deleted b', response.data)
        const ticketindextoremove = AppState.ticketProfile.findIndex(tir => tir.id == ticketId)
        AppState.ticketProfile.splice(ticketindextoremove, 1)
        AppState.activeEvents.capacity++
    }
    async getTickets(ticketdata) {
        const response = await api.post('api/tickets', ticketdata)
        logger.log('you got a ticket mate', response.data)
        const newTicket = new TicketProfile(response.data)
        AppState.ticketProfile.push(newTicket)
        AppState.activeEvents.capacity--
        AppState.activeEvents.ticketCount++

    }
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
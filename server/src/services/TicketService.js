import { dbContext } from "../db/DbContext.js"

class TicketService {
    async getticketsByAccountId(accoundId) {
        const tickets = await dbContext.Ticket.find({ accoundId }).populate('event')
        return tickets
    }
    async createTickets(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile')
        return ticket
        // await ticket.populate('profile event')
    }

}
export const ticketService = new TicketService()
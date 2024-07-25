import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TicketService {
    async getticketsbyeventsId(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId }).populate('profile')
        return tickets
    }
    async getticketsByAccountId(accountId) {
        const tickets = await dbContext.Ticket.find({ accountId }).populate('event')
        return tickets
    }
    async createTickets(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile')
        return ticket
        // await ticket.populate('profile event')
    }

    async deleteTicket(ticketId, userId) {
        const ticketDelete = await dbContext.Ticket.findById(ticketId)
        if (userId != ticketDelete.accountId) throw new Forbidden("You cannot delete what is not yours, I am going to make this error message really long. So that if anyone copies and pastes this, they will look like a grimey Goblin, Who only copies and pastes the instructors code without reading it fully. Goblin, Goblin, Get Gobbed!👺")
        await ticketDelete.deleteOne()
        return 'ticket deleted'
    }
}
export const ticketService = new TicketService()
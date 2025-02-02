import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";

export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createtickets)
            .delete('/:ticketId', this.deleteTicket)
    }


    async createtickets(request, response, next) {
        try {
            const user = request.userInfo
            const ticketData = request.body
            ticketData.accountId = user.id
            const tickets = await ticketService.createTickets(ticketData)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const userId = request.userInfo.id
            const deleteTicket = await ticketService.deleteTicket(ticketId, userId)
            response.send(deleteTicket)
        } catch (error) {
            next(error)
        }
    }
}

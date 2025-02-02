import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventService } from "../services/TowerEventService.js";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";
import { ticketService } from "../services/TicketService.js";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getevents)
            .get('/:eventId', this.geteventsbyId)
            .get('/:eventId/comments', this.getEventComments)
            .get('/:eventId/tickets', this.getticketsbyeventsId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }


    async createEvent(request, response, next) {
        try {
            const user = request.userInfo
            const eventData = request.body
            eventData.creatorId = user.id
            const event = await towerEventService.createEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }


    async getEventComments(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentService.getEventComments(eventId)
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const eventUpdate = request.body
            const event = await towerEventService.editEvent(eventId, eventUpdate, request.userInfo.id)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(request, response, next) {
        try {
            const user = request.userInfo
            const eventID = request.params.eventId
            const cancel = await towerEventService.cancelEvent(eventID, user.id)
            response.send(cancel)
        } catch (error) {
            next(error)
        }
    }

    async getevents(request, response, next) {
        try {
            const events = await towerEventService.getevents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getticketsbyeventsId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketService.getticketsbyeventsId(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async geteventsbyId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await towerEventService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

}
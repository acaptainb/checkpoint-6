import { Error } from "mongoose"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventService {


    async createEvent(eventData) {
        const event = await dbContext.TowerEvent.create(eventData)
        await event.populate('creator ticketCount')
        // await event.populate('ticketCount')
        return event
    }

    async getevents() {
        const events = await dbContext.TowerEvent.find().populate('creator').populate('ticketCount')
        return events
    }

    async getEventById(eventId) {
        const event = await (await dbContext.TowerEvent.findById(eventId)).populate('creator ticketCount')
        if (event == null) throw new Error(`no event with this id ${eventId}`)
        return event
    }

    async editEvent(eventId, eventBody, accountId) {
        const foundEvent = await dbContext.TowerEvent.findById(eventId)
        if (!eventId) throw new Error(`couldn't find any events${eventId}`)
        if (foundEvent.creatorId != accountId) throw new Forbidden('This is not your event')
        if (foundEvent.isCanceled) throw new BadRequest('The event is canceled')
        foundEvent.name = eventBody.name || foundEvent.name
        foundEvent.description = eventBody.description || foundEvent.description
        foundEvent.coverImg = eventBody.coverImg || foundEvent.coverImg
        foundEvent.location = eventBody.location || foundEvent.location
        foundEvent.capacity = eventBody.capacity || foundEvent.capacity
        foundEvent.startDate = eventBody.startDate || foundEvent.startDate
        foundEvent.type = eventBody.type || foundEvent.type
        await foundEvent.save()
        return foundEvent
    }

    async cancelEvent(eventID, Userid) {
        const cancelevent = await this.getEventById(eventID)
        if (Userid != cancelevent.creatorId) throw new Forbidden('you cant delete event that is not yours')
        cancelevent.isCanceled = !cancelevent.isCanceled
        await cancelevent.save()
        return `${cancelevent.name} was canceled`
    }

}
export const towerEventService = new TowerEventService()
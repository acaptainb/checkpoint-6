import { dbContext } from "../db/DbContext.js"

class TowerEventService {
    async createEvent(eventData) {
        const event = await dbContext.TowerEvent.create(eventData)
        await event.populate('creator')
        return event
    }

    async getevents() {
        const events = await dbContext.TowerEvent.find().populate('creator')
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.TowerEvent.findById(eventId)
        if (event == null) throw new Error(`no event with this id ${eventId}`)
        return event
    }

}
export const towerEventService = new TowerEventService()
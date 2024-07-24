import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

export class EventService {
    async getEventById(eventId) {
        AppState.activeEvents = null
        const response = await api.get(`api/events/${eventId}`)
        logger.log('Event id?', response.data)
        const event = new Event(response.data)
        AppState.activeEvents = event
    }
    async getAllEvents() {
        const response = await api.get('api/events')
        logger.log('card event', response.data)
        // console.log(response.data);
        const events = response.data.map(eventData => new Event(eventData))
        AppState.events = events

    }

}
export const eventService = new EventService()
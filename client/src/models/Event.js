import { Account } from "./Account.js"

export class Event {
    constructor(data) {

        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.location = data.location
        this.capacity = data.capacity
        this.description = data.description || 'No description provided'
        this.coverImg = data.coverImg
        this.isCanceled = data.isCanceled
        this.type = data.type
        // this.creator = new Account(data.creator)
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.ticketCount = data.ticketCount
    }
}
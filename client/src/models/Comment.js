import { Account } from "./Account.js"


export class Comment {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.creatorId = data.creatorId
        this.body = data.body
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creator = data.creator ? new Account(data.creator) : null
    }
}
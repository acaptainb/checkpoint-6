import { Account } from "./Account.js"
import { Event } from "./Event.js"

export class Ticket {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
    }
}

export class TicketProfile extends Ticket {
    constructor(data) {
        super(data)
        this.profile = new Account(data.profile)
    }
}

export class TicketEvent extends Ticket {
    constructor(data) {
        super(data)
        this.event = new Event(data.event)
    }
}
import { Schema } from "mongoose";



export const TicketSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.ObjectId, required: true, ref: 'TowerEvent' },
}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
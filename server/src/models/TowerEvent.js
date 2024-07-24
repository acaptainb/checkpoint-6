
import { Schema } from "mongoose";


export const TowerEventSchema = new Schema({
    creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
    description: { type: String, minLength: 15, maxLength: 1000, required: true },
    name: { type: String, minLength: 3, maxLength: 50, required: true },
    capacity: { type: Number, min: 1, max: 5000, required: true },
    location: { type: String, minLength: 3, maxLength: 50, required: true },
    coverImg: { type: String, maxLength: 1000, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    startDate: { type: Date, required: true, },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'concert', lowercase: true }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    ref: 'Ticket',
    foreignField: 'eventId',
    count: true
})
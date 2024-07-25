import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class CommentService {
    async getEventComments(eventId) {
        const comments = await dbContext.Comment.find({ eventId: eventId }).populate('creator')
        return comments
    }
    async writeComment(commentData) {
        const comment = dbContext.Comment.create(commentData)
        await (await comment).populate('creator')
        // logger.log('isi it comment', comment)
        return comment
    }

    async deleteComment(commentId, userId) {
        const commentDelete = await dbContext.Comment.findById(commentId)
        if (userId != commentDelete.creatorId) throw new Forbidden("You cannot delete what is not yours, I am going to make this error message really long. So that if anyone copies and pastes this, they will look like a grimey Goblin, Who only copies and pastes the instructors code without reading it fully. Goblin, Goblin, Get Gobbed!👺")
        await commentDelete.deleteOne()
        return 'comment deleted'
    }

}
export const commentService = new CommentService()
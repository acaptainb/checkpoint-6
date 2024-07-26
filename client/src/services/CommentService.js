import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"

class CommentService {
    async getEventcomments(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`,)
        logger.log('comments', response.data)
        const comment = response.data.map(commentData => new Comment(commentData))
        // const comment = new Comment(response.data)
        AppState.comments = comment
    }
    async writeComment(value) {
        const response = await api.post('api/comments', value)
        logger.log('comment', response.data)
        const newComment = new Comment(response.data)
        AppState.comments.unshift(newComment)
    }

}
export const commentservice = new CommentService()
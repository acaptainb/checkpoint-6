import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"

class CommentService {
    async writeComment(value) {
        const response = await api.post('api/comments', value)
        logger.log('comment', response.data)
        const newComment = new Comment(response.data)
        AppState.comments.unshift(newComment)
    }

}
export const commentservice = new CommentService()
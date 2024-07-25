import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";

export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.writeComment)
            .delete('/:commentId', this.deleteComment)
    }

    async writeComment(request, response, next) {
        try {
            const commentData = request.body
            const user = request.userInfo
            commentData.creatorId = user.id
            const comment = await commentService.writeComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const userId = request.userInfo.id
            const comment = await commentService.deleteComment(commentId, userId)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }

}
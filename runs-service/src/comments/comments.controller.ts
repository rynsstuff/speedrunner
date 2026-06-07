import { Body, Controller, Delete, Param, Post, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { commentCreateDTO } from './dtos/commentCreateDTO/commentCreateDTO';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {

    constructor(private readonly _commentsService: CommentsService) {}

    @Post()
    async createNewComment(@Body() comment: commentCreateDTO, @Request() req: any) {
        return this._commentsService.createNewComment(comment, req.user.userId);
    }

    @Delete(':id')
    async deleteComment(@Param('id') comment_id: string, @Request() req: any) {
        return this._commentsService.deleteComment(comment_id, req.user);
    }
}
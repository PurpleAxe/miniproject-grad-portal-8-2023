import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { 
  IUpdateCommentsRequest,
  IUpdateCommentsResponse
} from '@mp/api/comments/util';
import { UpdateCommentsCommand } from '@mp/api/comments/util';

@Injectable()
export class CommentsService {
  constructor(private commandBus: CommandBus) {}
  //TODO your function here
  async updateComments(
    request: IUpdateCommentsRequest
  ): Promise<IUpdateCommentsResponse> {
    return await this.commandBus.execute<
      UpdateCommentsCommand,
      IUpdateCommentsResponse
    >(new UpdateCommentsCommand(request));
  }
}

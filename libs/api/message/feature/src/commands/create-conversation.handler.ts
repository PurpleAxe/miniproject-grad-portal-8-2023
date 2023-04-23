import {CreateConversationCommand, IConversation, ICreateConversationResponse} from "@mp/api/message/util";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import { EventPublisher } from "@nestjs/cqrs";
import { UsersRepository } from "@mp/api/users/data-access";
import { Message } from "../models";

@CommandHandler(CreateConversationCommand)
export class CreateConversationHandler
  implements
    ICommandHandler<CreateConversationCommand, ICreateConversationResponse>
{
  constructor(
    private readonly eventBus : EventPublisher,
    private readonly repository : UsersRepository,
  ) {};

  async execute(command: CreateConversationCommand): Promise<ICreateConversationResponse> {
    const request = command.request.conversation;

    // Checks
    if (request.conversationID) {
      throw new Error("Cannot create a conversation with existing ConversationID");
    }
    if (request.messages) {
      throw new Error("Cannot Create a conversation with pre-existing messages");
    }
    if (!request.members) {
      throw new Error("Cannot Create a conversation with no participants");
    }
    if (request.members?.length <= 1) {
      throw new Error("Cannot Create a conversation with only one member");
    }
    for (let member of request.members) {
      this.repository.doesUserExist(member).then((value) => {
        if (value) {
          throw new Error("Requested User does not exist");
        }
      })
    }
    console.log("Passed user validation");

    // Checks finnished
    const conversation = this.eventBus.mergeObjectContext(
      Message.fromData(request)
    );
    await conversation.createConversation();
    conversation.commit();

    const response: ICreateConversationResponse = {conversation : conversation.toJSON()};
    return response;
  }
}

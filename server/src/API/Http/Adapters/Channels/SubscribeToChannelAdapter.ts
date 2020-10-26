import {inject, injectable} from "inversify";
import {ValidationService} from "../../Validations/Utils/ValidationService";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import SubscribeToChannelCommand from "../../../../Application/Commands/Command/Channels/SubscribeToChannelCommand";
import ValidationException from "../../../../Application/Exception/ValidationException";

@injectable()
class SubscribeToChannelAdapter {
  private validation: ValidationService;
  public constructor(@inject(INTERFACES.IValidation) validation: ValidationService) {
    this.validation = validation;
  }

  public from(body: any): SubscribeToChannelCommand {
    const error = this.validation.validate(body, {});

    if (error) {
      throw new ValidationException(JSON.stringify(this.validation.validateResult(error.details)));
    }

    return new SubscribeToChannelCommand(
      body.channelId,
      body.userId,
    )
  }
}

export default SubscribeToChannelAdapter;
import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import {ValidationService} from "../../../Http/Validations/Utils/ValidationService";
import ValidationException from "../../../../Application/Exception/ValidationException";
import StoreMessageCommand from "../../../../Application/Commands/Command/Messages/StoreMessageCommand";

@injectable()
class StoreMessageAdapter {
  private validation: ValidationService;

  public constructor(@inject(INTERFACES.IValidation) validation: ValidationService) {
    this.validation = validation;
  }

  public from(data: any) {
    const error = this.validation.validate(data, {});

    if (error) {
      throw new ValidationException(JSON.stringify(this.validation.validateResult(error.details)));
    }

    return new StoreMessageCommand(
      data.userId,
      data.channelId,
      data.content,
    );
  }
}

export default StoreMessageAdapter;
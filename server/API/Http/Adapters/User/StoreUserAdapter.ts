import {inject} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types.js";
import {ValidationService} from "../../Validations/Utils/ValidationService.js";
import ValidationException from "../../../../Application/Exception/ValidationException.js";
import StoreUserCommand from "../../../../Application/Commands/Command/User/StoreUserCommand.js";

class StoreUserAdapter {
  private validation: ValidationService;
  constructor(@inject(INTERFACES.IValidation) validation: ValidationService) {
    this.validation = validation;
  }

  public from(body: any) {
    const error = this.validation.validate(body, {});

    if (error) {
      throw new ValidationException(JSON.stringify(this.validation.validateResult(error.details)));
    }

    return new StoreUserCommand(
      body.name,
      body.surname,
      body.email,
      body.password,
    );
  }
}

export default StoreUserAdapter;
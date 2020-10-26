import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import {ValidationService} from "../../Validations/Utils/ValidationService";
import ValidationException from "../../../../Application/Exception/ValidationException";
import StoreUserCommand from "../../../../Application/Commands/Command/User/StoreUserCommand";

@injectable()
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
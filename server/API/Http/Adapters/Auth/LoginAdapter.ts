import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types.js";
import {ValidationService} from "../../Validations/Utils/ValidationService.js";
import LoginQuery from "../../../../Application/Queries/Query/Auth/LoginQuery.js";
import ValidationException from "../../../../Application/Exception/ValidationException.js";

@injectable()
class LoginAdapter {
  private validation: ValidationService;
  public constructor(@inject(INTERFACES.IValidation) validation: ValidationService) {
    this.validation = validation;
  }

  public from(body: any): LoginQuery {
    const error = this.validation.validate(body, {});

    if (error) {
      throw new ValidationException(JSON.stringify(this.validation.validateResult(error.details)));
    }

    return new LoginQuery(
      body.email,
      body.password
    );
  }
}

export default LoginAdapter;
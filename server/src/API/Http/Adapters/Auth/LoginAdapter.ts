import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import {ValidationService} from "../../Validations/Utils/ValidationService";
import LoginQuery from "../../../../Application/Queries/Query/Auth/LoginQuery";
import ValidationException from "../../../../Application/Exception/ValidationException";

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
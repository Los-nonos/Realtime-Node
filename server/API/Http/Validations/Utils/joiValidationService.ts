import {ValidationService} from "./ValidationService.js";
import {injectable} from "inversify";
import * as Joi from 'joi';

// @ts-ignore
@injectable()
class JoiValidationService implements ValidationService {
  public validate(data: any, schema: any) {
    const validationsOptions = { abortEarly: false, allowUnknown: true };

    const { error } = Joi.validate(data, schema, validationsOptions);

    return error;
  }

  public validateResult(errors: any) {
    const usefulErrors: any = {
      errors: {},
      type: 'UnprocessableEntity',
    };

    errors.map((error: any) => {
      if (error.type === 'E0001') {
        usefulErrors.type = 'BadRequestException';
      }

      if (!usefulErrors.errors.hasOwnProperty(error.path.join('_'))) {
        usefulErrors.errors[error.path.join('_')] = {
          field: error.path.join('_'),
          type: error.type,
          message: error.message,
        };
      }
    });

    return usefulErrors;
  }
}

export default JoiValidationService;
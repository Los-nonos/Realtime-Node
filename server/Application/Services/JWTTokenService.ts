import {TokenService} from "../../Domain/Interfaces/Services/TokenService.js";
import TokenPayload from "../../Domain/Types/TokenPayload.js";
import {jwtConfig} from "../../config/jwtConfig.js";
import * as jwt from 'jsonwebtoken';
import AuthorizationFailed from "../Exception/AuthorizationFailed.js";
import {ErrorsKeys} from "../../Domain/Types/ErrorsKeys.js";

class JWTTokenService implements TokenService {
  public generateTokenFromPayload(param: TokenPayload): string {
    return jwt.sign(param, jwtConfig.jwtSecret, {
      expiresIn: jwtConfig.expirationTime,
    });
  }

  public unHashTokenOrFail(token: string): TokenPayload {
    let decoded;
    try {
      decoded = jwt.verify(token, jwtConfig.jwtSecret);
    } catch {
      throw new AuthorizationFailed(ErrorsKeys.token, 'Unauthorized or corrupted token');
    }

    if (typeof decoded !== 'object') {
      throw new AuthorizationFailed(ErrorsKeys.token, 'Unauthorized or corrupted token');
    }
    return decoded;
  }
}

export default JWTTokenService;
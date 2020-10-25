import TokenPayload from "../../Types/TokenPayload.js";

export interface TokenService {
  generateTokenFromPayload(param: TokenPayload): string;
  unHashTokenOrFail(token: string): TokenPayload;
}
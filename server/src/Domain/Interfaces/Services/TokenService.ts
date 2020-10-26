import TokenPayload from "../../Types/TokenPayload";

export interface TokenService {
  generateTokenFromPayload(param: TokenPayload): string;
  unHashTokenOrFail(token: string): TokenPayload;
}
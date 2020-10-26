import {inject, injectable} from "inversify";
import StoreUserAction from "../Actions/User/StoreUserAction";
import LoginAction from "../Actions/Auth/LoginAction";
import  {Request, Response, Router} from "express";
import {asyncMiddleware} from "../Middlewares/asyncMiddleware";

@injectable()
class PublicRoutes {
  private storeUserAction: StoreUserAction;
  private loginAction: LoginAction;
  private router: Router;

  constructor(
    @inject(StoreUserAction) storeUserAction: StoreUserAction,
    @inject(LoginAction) loginAction: LoginAction,
  ) {
    this.router = Router();
    this.storeUserAction = storeUserAction;
    this.loginAction = loginAction;
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get('/hello', (_req, res) => {
      res.send('hola');
    });

    this.router.post('/login', asyncMiddleware(async (req: Request, res: Response) => await this.loginAction.execute(req, res)));

    this.router.post('/register', asyncMiddleware(async (req: Request, res: Response) => await this.storeUserAction.execute(req, res)))
  }

  public getRoutes() {
    return this.router;
  }
}

export default PublicRoutes;
import bodyParser from 'body-parser';
import cors from 'cors';
import {Application, Request, Response} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import PublicRoutes from "./API/Http/Routes";
import DIContainer from "./Infrastructure/DI/di.config.js";
import DatabaseConnection from "./Infrastructure/Persistence/DatabaseConnection.js";
import Sockets from "./API/Broadcast/Sockets";

class App {
  private app: Application;

  public constructor(express: Application) {
    this.app = express;
  }

  public async upServer() {
    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    const result = dotenv.config();

    if (result.error) {
      throw new Error(`Environment variables not configured, aborting`);
    }

    this.setMiddlewares();
    this.setRoutes();
    this.setSockets();
    this.setErrorHandler();
    await this.createDatabaseConnection();
  }

  public getApp() {
    return this.app;
  }

  private setMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(helmet());
  }

  private setRoutes() {
    const publicRoutes = DIContainer.resolve<PublicRoutes>(PublicRoutes);

    this.app.use(publicRoutes.getRoutes());
  }

  private async createDatabaseConnection() {
    const dbConnection = new DatabaseConnection();
    await dbConnection.getConnection();
  }

  private setErrorHandler() {
    this.app.use((error: any, _req: Request, res: Response) => {
      res.json(error);
    });
  }

  private setSockets() {
    const sockets = new Sockets(this.app);
    sockets.up();
  }
}

export default App;
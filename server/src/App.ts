import bodyParser from 'body-parser';
import cors from 'cors';
import express, {Application} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import PublicRoutes from "./API/Http/Routes";
import DIContainer from "./Infrastructure/DI/di.config";
import DatabaseConnection from "./Infrastructure/Persistence/DatabaseConnection";
import Sockets from "./API/Broadcast/Sockets";
import path from "path";

class App {
  private app: Application;
  private http: any;

  public constructor(express: Application, http: any) {
    this.app = express;
    this.http = http;
  }

  public async upServer() {
    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    const result = dotenv.config({path: './src/.env'});

    if (result.error) {
      throw new Error(`Environment variables not configured, aborting`);
    }

    this.setMiddlewares();
    this.setSockets();
    this.setRoutes();
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

    const publicPath = path.join(__dirname, '../../public');
    console.log(publicPath);

    this.app.use(express.static(publicPath))
    this.app.use(publicRoutes.getRoutes());
  }

  private async createDatabaseConnection(): Promise<void> {
    const dbConnection = new DatabaseConnection();
    await dbConnection.getConnection();
  }

  private setErrorHandler() {

  }

  private setSockets() {
    const sockets = DIContainer.resolve<Sockets>(Sockets);
    sockets.up(this.http);
  }
}

export default App;
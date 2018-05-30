import * as HemeraStats from 'hemera-stats';
import * as HemeraJoi from 'hemera-joi';
import * as HemeraMongo from 'hemera-mongo-store';
import * as Pino from 'pino';
import { Service } from 'justinject';
import * as Hemera from 'nats-hemera';
import { HemeraService } from './hemera/hemera.service';
import { ActionFactoryService } from './action/action-factory.service';
import { MongoService } from './database/mongo.service';

@Service('singleton')
export class MainService {
    constructor(public hemera: HemeraService, public action: ActionFactoryService, public mongo: MongoService) {
        // PLUGINS
        this.hemera.instance.use(HemeraJoi);
        const mongoUrl = this.mongo.connectionString();

        this.hemera.instance.use(HemeraMongo, {
            useDbAsTopicSuffix: true,
            mongo: {
                url: mongoUrl,
            },
        });

        this.hemera.instance.use(HemeraStats);
        // PLUGINS
    }

    public instance() {
        return this.hemera.instance;
    }

    public startService(): Promise<Hemera> {
        return new Promise((resolve, reject) => {
            this.hemera.instance.ready(() => {

                this.action.registerActions();

                Pino().info('Service started!');

                resolve(this.hemera.instance);
            });

        });
    }
}

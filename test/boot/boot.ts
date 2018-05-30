import 'mocha';
import { Container } from 'justinject';
const Nats = require('hemera-testsuite/nats');
import * as Hemera from 'nats-hemera';
import { MainService } from '../../src/main';
import { NatsService } from '../../src/hemera/nats.service';
import * as dotenv from 'dotenv';

export class NatsServiceMock {
    getConnection() {
        return new Hemera(new Nats(), {});
    }
}

export class Boot {
    public deps: MainService;

    constructor() {
        // CONFIG FOR TESTING
        if (!process.env.TEST) {
            dotenv.config();
        }
        // CONFIG

        Container.mock([
            {
                service: NatsService,
                mockWith: NatsServiceMock,
                override: true,
                type: 'default'
            }
        ]);

        this.deps = Container.resolve<MainService>(MainService);
    }

    public instance(): Promise<Hemera | string> {
        return new Promise((resolve, reject) => {
            this.deps.startService()
                .then((hemeraInst: Hemera) => {
                    resolve(hemeraInst);
                })
                .catch((err: any) => {
                    if (this.deps.instance()) {
                        resolve(this.deps.instance())
                    } else {
                        reject('No instance')
                    }
                });
        })
    }

    public resolve() {
        return this.deps;
    }
}
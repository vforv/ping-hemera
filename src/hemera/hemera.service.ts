import { Service } from 'justinject';
import { NatsService } from './nats.service';
import * as Hemera from 'nats-hemera';

@Service('singleton')
export class HemeraService {
    public hemera: Hemera;

    constructor(public nats: NatsService) {
        this.hemera = nats.getConnection();
    }

    get instance(): Hemera {
        return this.hemera;
    }

    get joi() {
        return this.hemera.joi;
    }
}

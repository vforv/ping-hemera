import * as Hemera from 'nats-hemera';
import { Service } from 'justinject';
import * as Nats from 'nats';

@Service()
export class NatsService {
    public getConnection() {
        const nats = Nats.connect({
            url: `nats://${process.env.TITAN_NATS_SERVICE_HOST}:4222`,
            user: process.env.NATS_CLUSTER_USER,
            pass: process.env.NATS_CLUSTER_PASSWORD,
        });

        return new Hemera(nats, { logLevel: 'info' });
    }
}

import { STORE, COLLECTION } from '../database';
import { Service, Action } from 'justinject';
import { HemeraService } from '../hemera/hemera.service';
import { IdValidatorService } from '../validator/id-validator.service';
import { mongoResponse } from '../helper/mongo-response.helper';

export interface IAction {
    topic: string;
    cmd: string;
}

@Service()
export class DeleteActionService {

    constructor(public hemera: HemeraService, public validator: IdValidatorService) { }

    @Action({
        topic: 'ping',
        cmd: 'delete',
    })
    public deleteAction(msg?: any, done?: any) {

        this.hemera.instance.act({
            topic: STORE,
            cmd: 'removeById',
            collection: COLLECTION,
            id: msg.data.id,
        }, (err: any, response: any) => {
            /* istanbul ignore if  */
            if (err) {
                return done(err);
            }

            const merged = mongoResponse(response);

            return done(null, merged);
        });

    }
}

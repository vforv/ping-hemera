import { STORE, COLLECTION } from '../database';
import { Service, Action } from 'justinject';
import { HemeraService } from '../hemera/hemera.service';
import { CreateValidatorService } from '../validator/create-validator.service';
import { mongoResponse } from '../helper/mongo-response.helper';

export interface IAction {
    topic: string;
    cmd: string;
}

@Service()
export class CreateActionService {

    constructor(public hemera: HemeraService, public validator: CreateValidatorService) { }

    @Action({
        topic: 'ping',
        cmd: 'create',
    })
    public createAction(msg?: any, done?: any) {

        this.hemera.instance.act({
            topic: STORE,
            cmd: 'create',
            collection: COLLECTION,
            data: msg.data,
        }, (err: any, response: any) => {
            /* istanbul ignore if  */
            if (err) {
                return done(err);
            }

            const merged = mongoResponse({
                ...msg.data,
                ...response,
            });

            return done(null, merged);
        });

    }
}

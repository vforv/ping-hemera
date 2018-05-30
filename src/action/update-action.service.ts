import { Service, Action } from 'justinject';
import { HemeraService } from '../hemera/hemera.service';
import { STORE, COLLECTION } from '../database';
import { UpdateValidatorService } from '../validator/update-validator.service';
import { mongoResponse } from '../helper/mongo-response.helper';

@Service()
export class UpdateActionService {
    constructor(public hemera: HemeraService, public validator: UpdateValidatorService) { }

    @Action({
        topic: 'ping',
        cmd: 'update',
    })
    public updateAction(msg?: any, done?: any) {

        const { id, ...data } = msg.data;

        this.hemera.instance.act({
            topic: STORE,
            cmd: 'replaceById',
            collection: COLLECTION,
            id,
            data: { $set: data },
        }, (err: any, response: any) => {
            /* istanbul ignore if  */
            if (err) {
                return done(err);
            }

            const merged = mongoResponse({
                ...response,
                ...msg.data,
            });

            return done(null, merged);
        });
    }
}

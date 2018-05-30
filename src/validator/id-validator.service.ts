import { Service } from 'justinject';
import { ID } from '../model/ping.model';
import { HemeraService } from '../hemera/hemera.service';

@Service()
export class IdValidatorService {

    constructor(public hemera: HemeraService) { }

    get schema() {

        return this.hemera.joi.object().required()
            .keys<ID>(
            {
                id: this.hemera.joi.string().required(),
            });
    }
}

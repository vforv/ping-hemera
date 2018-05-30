import { Service } from 'justinject';
import { IPingModel } from '../model/ping.model';
import { HemeraService } from '../hemera/hemera.service';

@Service()
export class UpdateValidatorService {

    constructor(public hemera: HemeraService) { }

    get schema() {

        return this.hemera.joi.object().required()
            .keys<IPingModel>(
            {
                name: this.hemera.joi.string().required(),
                id: this.hemera.joi.string().required(),
            });
    }
}

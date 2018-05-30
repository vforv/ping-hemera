import { Service } from 'justinject';
import { CreateActionService } from './create-action.service';
import { UpdateActionService } from './update-action.service';
import { ReadActionService } from './read-action.service';
import { DeleteActionService } from './delete-action.service';

@Service()
export class ActionFactoryService {
    constructor(
        public create: CreateActionService,
        public update: UpdateActionService,
        public read: ReadActionService,
        public deleteAct: DeleteActionService,
    ) { }

    public registerActions() {
        this.create.createAction();
        this.update.updateAction();
        this.read.readAction();
        this.deleteAct.deleteAction();
    }
}

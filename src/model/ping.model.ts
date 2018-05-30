import { StringSchema } from 'nats-hemera';

export interface IPingModel {
    id?: StringSchema;
    name: StringSchema;
}

export interface ID {
    id: StringSchema;
}

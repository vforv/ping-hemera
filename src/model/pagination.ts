import { NumberSchema, StringSchema } from 'joi';

export interface IPagination {
    limit: NumberSchema;
    lastId: StringSchema;
}

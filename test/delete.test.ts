import * as chai from 'chai';
import { Boot } from './boot';
import * as Hemera from 'nats-hemera';

const expect = chai.expect;

const testData: any = {
    name: 'Vladimir',
}

let hemera: Hemera;
let entity: any;

describe('Test for deleteing entity', function () {

    before((done) => {
        const boot = new Boot();
        boot.instance()
            .then((instance: any) => {
                hemera = instance;
                hemera.act({
                    topic: 'ping',
                    cmd: 'create',
                    data: testData
                }, (err: any, resp: any) => {
                    entity = resp;
                    done();
                })
            })
            .catch((error: any) => {

                throw error
            })
    });


    after((done) => {
        hemera.close(done);
    })

    it('Validation works', (done) => {
        hemera.act({
            topic: 'ping',
            cmd: 'delete',
        }, (error: any, resp: any) => {
            expect(error.message).to.be.equals('child "data" fails because ["data" is required]')
        })

        hemera.act({
            topic: 'ping',
            cmd: 'delete',
            data: {

            }
        }, (error: any, resp: any) => {
            expect(error.message).to.be.equals('child "data" fails because [child "id" fails because ["id" is required]]')
            done();
        })
    });

    it('Delete entity', (done) => {
        hemera.act({
            topic: 'ping',
            cmd: 'delete',
            data: { id: entity.id }
        }, (err: any, resp: any) => {
            expect(resp.id).to.exist;
            done();
        })
    });
})

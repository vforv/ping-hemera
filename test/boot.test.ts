import * as chai from 'chai';
import { Boot, NatsServiceMock } from './boot';
import * as Hemera from 'nats-hemera';
import { Container } from 'justinject';
import { MainService } from '../src/main';
import { MongoService } from '../src/database/mongo.service';

const expect = chai.expect;

let hemera: Hemera;

describe('Test for booting', function () {

    before((done) => {
        const boot = new Boot();
        boot.instance()
            .then((instance: any) => {
                hemera = instance;
                done();
            })
            .catch((error: any) => {
                
                throw error
            })
    });


    after((done) => {
        hemera.close(done);
    })

    it('Get instance test', (done) => {
        const deps = Container.resolve<MainService>(MainService);

        expect(deps.instance()).to.exist;
        done();
    })

    it('Test fake nats server', (done) => {
        const nats = new NatsServiceMock();
        
        expect(nats.getConnection()).to.exist;
        done();
    })

    it('Testing mongo cluster', (done) => {
        const cluster = Container.resolve<MongoService>(MongoService);

        expect(cluster.connectionString()).to.exist;

        done();
    })
})
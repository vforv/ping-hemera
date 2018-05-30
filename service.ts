import { Container } from 'justinject';
import { MainService } from './src/main';

const main = Container.resolve<MainService>(MainService);

main.startService();
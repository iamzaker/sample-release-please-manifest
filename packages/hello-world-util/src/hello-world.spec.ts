import { helloWorld } from './hello-world';

describe('index', () => {
    it('should return true', () => { 
        expect(helloWorld()).toEqual('Hello World from package with v:0.0.4!');
    });
 });
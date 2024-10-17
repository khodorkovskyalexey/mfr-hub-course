import 'reflect-metadata';
import { IAM } from '../../src/infrastructure/api/common';
import { Id } from '../../src/domain';
import { executionContextMock } from './mock/execution-context.mock';
import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

// eslint-disable-next-line  @typescript-eslint/ban-types
function getParamDecoratorFactory(decorator: Function): Function {
    class Test {
        public test(@decorator() _) {}
    }
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
    return args[Object.keys(args)[0]].factory;
}

describe('IAM', () => {
    // eslint-disable-next-line  @typescript-eslint/ban-types
    let iam: Function;
    let ctx: ExecutionContext;

    beforeAll(async () => {
        iam = getParamDecoratorFactory(IAM);
        ctx = executionContextMock();
    });

    it('success full user', () => {
        const result = iam(null, ctx);
        expect(result).toEqual({ id: new Id(1), name: 'terminator' });
    });

    it('success pick id', () => {
        const result = iam('id', ctx);
        expect(result).toEqual(new Id(1));
    });

    it('success pick name', () => {
        const result = iam('name', ctx);
        expect(result).toEqual('terminator');
    });
});

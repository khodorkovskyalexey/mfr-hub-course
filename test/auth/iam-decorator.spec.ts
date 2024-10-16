import { Test } from '@nestjs/testing';
import { IAM } from '../../src/infrastructure/api/common';
import { Id } from '../../src/domain';
import { executionContextMock } from './mock/execution-context.mock';
import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

function getParamDecoratorFactory(decorator: Function): Function {
    class Test {
        public test(@decorator() _) {}
    }
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
    return args[Object.keys(args)[0]].factory;
}

describe('IAM', () => {
    let iam: Function;
    let ctx: ExecutionContext;

    beforeAll(async () => {
        await Test.createTestingModule({}).compile();
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

export const executionContextMock = (isSuccess: boolean) => ({
    switchToHttp: () => ({
        getRequest: () => ({
            headers: { authorization: `Bearer ${isSuccess ? 'good' : 'bad'}` },
        }),
    }),
});

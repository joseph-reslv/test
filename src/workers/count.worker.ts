const ctx: DedicatedWorkerGlobalScope = self as any;

ctx.addEventListener('message', (event) => {
    const { id, payload } = event.data;
    setTimeout(() => {
        console.log(payload);
        ctx.postMessage({
            id: id,
            payload: { foo: 'boo' },
        });
        ctx.close(); // for terminate web worker when finish
    }, 5000);
});

export default null as any; // typescript error

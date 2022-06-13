class workerWrapper {
    worker: Worker;
    resolves: { [key: string]: any } = {};
    rejects: { [key: string]: any } = {};
    globalMsgId = 0;
    constructor(workerClass: Worker) {
        this.worker = workerClass;
        this.worker.onmessage = (msg) => this.handleMsg(msg, this); // must bind `this`
    }

    sendMsg(payload: any) {
        const msgId = this.globalMsgId++;
        const msg = {
            id: msgId,
            payload,
        };
        return new Promise((resolve, reject) => {
            // save callbacks for later
            this.resolves[msgId] = resolve;
            this.rejects[msgId] = reject;
            this.worker.postMessage(msg);
        });
    }

    handleMsg(msg: { data: { id: number; err: any; payload: any } }, self: this) {
        const { id, err, payload } = msg.data;
        if (payload) {
            const resolve = self.resolves && self.resolves[id];
            if (resolve) {
                resolve(payload);
            }
        } else {
            // error condition
            const reject = self.rejects && self.rejects[id];
            if (reject) {
                if (err) {
                    reject(err);
                } else {
                    reject('Got nothing');
                }
            }
        }

        // purge used callbacks
        if (self.resolves && self.resolves[id]) delete self.resolves[id];
        if (self.rejects && self.rejects[id]) delete self.rejects[id];
    }

    request(payload: any) {
        return this.sendMsg(payload);
    }
}
export default workerWrapper;

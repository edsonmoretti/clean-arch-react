export class NotfoundError extends Error {
    constructor() {
        super('Not found');
        this.name = 'NotfoundError';
    }
}

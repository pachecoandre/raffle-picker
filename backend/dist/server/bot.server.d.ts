export default class Server {
    private app;
    port: number;
    storage: any;
    constructor(port: any);
    route: () => void;
    listen: () => void;
}

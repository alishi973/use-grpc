function getAllMethods(obj: object): string[] {
    if (obj == null || obj.constructor === Object) return []; // recursive approach
    const props = Object.getOwnPropertyNames(obj)
        .filter((key) => typeof (obj as any)[key] == 'function')
        .filter((key) => key !== 'constructor');
    return [...props, ...getAllMethods(Object.getPrototypeOf(obj))];
}


export default function createGateway<TGateway>(gateway: TGateway): TGateway {
    Object.entries(gateway).forEach(([, service]: any) => {
        if ('client' in service) {
            getAllMethods(service.client).forEach((key) => {
                service.client[key] = service.client[key].bind(service.client);
            });
        }
    });
    return gateway
}
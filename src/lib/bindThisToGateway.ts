export default function bindApisThis(apis: any) {
    Object.entries(apis).forEach(([, service]: any) => {
        if ('client' in service) {
            getAllMethods(service.client).forEach((key) => {
                //@ts-ignore
                service.client[key] = service.client[key].bind(service.client);
            });
        }
    });
}

function getAllMethods(obj: object): string[] {
    if (obj == null || obj.constructor === Object) return []; // recursive approach
    const props = Object.getOwnPropertyNames(obj)
        .filter((key) => typeof (obj as any)[key] == 'function')
        .filter((key) => key !== 'constructor');
    return [...props, ...getAllMethods(Object.getPrototypeOf(obj))];
}
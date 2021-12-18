import { createService, bindThisToGateway, GrpcQueryOptionType } from '../../lib';
import * as HelloModel from '../assets/hello_pb'
import { HelloServiceClient } from '../assets/HelloServiceClientPb'

const baseUrl = "http://localhost:8080"

const gateway = {
    HelloService: {
        client: createService(HelloServiceClient, baseUrl),
        model: HelloModel
    },
    ByeByeService: {
        client: createService(HelloServiceClient, baseUrl),
        model: HelloModel
    }
}

bindThisToGateway(gateway)

const api = {
    sayHello: {
        client: gateway.HelloService.client.sayHello,
        payload: () => new gateway.HelloService.model.HelloRequest(),
        autoCall: true
    }
}

const GrpcQueryOption: GrpcQueryOptionType = {
    headers: {
        'custom-header-1': 'value1',
        'custom-header-2': 'value2',
        'x-auth-grpc': 'token will be placed here!'
    }
}



export { api, gateway, GrpcQueryOption }
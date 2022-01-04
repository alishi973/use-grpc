import { createService, createGateway, GrpcQueryOptionType } from '../../lib';
import * as HelloModel from '../assets/hello_pb'
import { HelloServiceClient } from '../assets/HelloServiceClientPb'
import { StatusCode } from 'grpc-web';

const baseUrl = "http://localhost:8080"

const gateway = createGateway({
    HelloService: {
        client: createService(HelloServiceClient, baseUrl),
        model: HelloModel
    },
    ByeByeService: {
        client: createService(HelloServiceClient, baseUrl),
        model: HelloModel
    }
})

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
    },
    afterCall: {
        onReject: (param) => {
            if (param.status === StatusCode.UNAUTHENTICATED) {
                alert("UNAUTHENTICATED")
            }
        }
    }
}



export { api, gateway, GrpcQueryOption }
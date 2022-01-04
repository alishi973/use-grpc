import { createService, createGateway } from '../../lib';
import * as HelloModel from '../assets/hello_pb'
import { HelloServiceClient } from '../assets/HelloServiceClientPb'

const baseUrl = "http://localhost:8080"

const gateway = createGateway({
    HelloService: {
        client: createService(HelloServiceClient, baseUrl),
        model: HelloModel
    }
})


const api = {
    sayHello: {
        client: gateway.HelloService.client.sayHello,
        autoCall: false,
        payload: ({ greeting }: { greeting: string }) => {
            const req = new gateway.HelloService.model.HelloRequest()
            req.setGreeting(greeting);
            return req
        }
    }
}


export { api, gateway }
Have you ever tried to bring grpc connection to the web?

then, you may need [grpc-web](https://github.com/grpc/grpc-web) for handle this type of requests.

for normal use of grpc-web, you wont have hard time, but when types comes important, you may have nightmare :D

using `grpc-web` is kinda ugly at first, you can see the document [here](https://github.com/grpc/grpc-web#grpc-web).

but you can leave everythings to `use-grpc` for handling request and it will return everythings you need to you :)

this hook will use `grpc-web` under the hood at all.

## Usage

The `use-grpc` is available at `npm`:

```sh
$ npm i use-grpc
// or using yarn
$ yarn add use-grpc
```

(Depend on your proto files, you may need to install [grpc-web](https://github.com/grpc/grpc-web) and [google-protobuf](https://www.npmjs.com/package/google-protobuf) too)

Then you need to config your gateway and api methods:

```config.ts
import { bindThisToGateway } from 'use-grpc'

import * as HelloModel from './hello_pb'
import { HelloServiceClient } from './HelloServiceClientPb'

import * as GoodByeModel from './goodbye_pb'
import { GoodByeServiceClient } from './GoodByeServiceClientPb'

const baseUrl = "http://www.example.com"

const gateway = {
    HelloService: {
        client: createService(HelloServiceClient, baseUrl),
        model: HelloModel
    },
    GoodByeService: {
        client: createService(GoodByeServiceClient, baseUrl),
        model: GoodByeModel
    }
}

bindThisToGateway(gateway)

export { gateway }
```

`createService` will make Service client with specified url (we add option for include credentials in the future).

⭕ Don't forgot to bind this to client service methods:

`bindThisToGateway` will bind this to the gateway (we refactor this to function that return whole gateway).

After create gateway, create your api like this:

```api.ts
import { gateway } from './config.ts'
const api = {
    sayHello: {
        client: gateway.HelloService.client.sayHello,
        requestObject: gateway.HelloService.model.HelloRequest
    }
}
export { api }
```

Then you need to wrap your application with `GrpcQueryProvider`.

```App.tsx
import { GrpcQueryProvider } from 'use-grpc'
export default function App() {
  return (
        <!-- Another Provider -->
            <GrpcQueryProvider>
                <RootComponent />
            </GrpcQueryProvider>
        <!-- Another Provider -->
    )
}
```

finally you can use `useGRPC` hook to fetch data:

```Example.tsx
import { useGRPC } from 'use-grpc';
import { api } from './api';

const ExampleApplication = () => {
  const { data, call, isLoading, error } = useGRPC(api.sayHello);

  return (
    <div>
      ...
    </div>
  );
};
```
Or you can see the example [here](https://github.com/alishi973/use-grpc/tree/main/src/examples).

## CONTRIBUTING
Feel free to ask for feature, Any Pull Request will be appreciated.

Currently we are on pre-release version, so maybe you can't use this on the production :D

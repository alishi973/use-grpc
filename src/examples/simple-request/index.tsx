import React from "react";
import { useGRPC, GrpcQueryProvider, GrpcQueryOption } from "../../lib";
import { HelloServiceClient } from "../assets/HelloServiceClientPb";
import * as HelloModel from "../assets/hello_pb";

const client = new HelloServiceClient("http://localhost:8080");
const payload = new HelloModel.HelloRequest();
client.sayHello(payload, {});
// client["sayHello"](payload, {});

const grpcOption: GrpcQueryOption = { baseUrl: "http://localhost:8080" };

const ExampleApplication = () => {
  const data = useGRPC(
    HelloServiceClient,
    { Request: HelloModel.HelloRequest, Response: HelloModel.HelloResponse },
    "sayHello"
  );
  return (
    <div>
      This is Simple Request example for use-grpc
      <button>Fetch data!</button>
      <code>
        <p>Response will show here:</p>
        {JSON.stringify(data.state)}
      </code>
    </div>
  );
};

export default function SimpleRequestExample() {
  return (
    <>
      <GrpcQueryProvider option={grpcOption}>
        <ExampleApplication />
      </GrpcQueryProvider>
    </>
  );
}

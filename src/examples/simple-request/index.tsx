import React from "react";
import { useGRPC } from "../../lib";
import { HelloServiceClient } from "../assets/HelloServiceClientPb";
import { HelloRequest, HelloResponse } from "../assets/hello_pb";

const client = new HelloServiceClient("http://localhost:3000");
const payload = new HelloRequest();
client.sayHello(payload, {});

export default function SimpleRequestExample() {
  return (
    <div>
      This is Simple Request example for use-grpc
      <button>Fetch data!</button>
    </div>
  );
}

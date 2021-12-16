import React from "react";
import { api } from "./config";
import { GrpcQueryProvider, useGRPC } from "../../lib";

const ExampleApplication = () => {
  const data = useGRPC(api.sayHello);

  return (
    <div>
      This is Simple Request example for use-grpc
      <button>Fetch data!</button>
      <code>
        <p>Response will show here:</p>
        {JSON.stringify(data)}
      </code>
    </div>
  );
};

export default function SimpleRequestExample() {
  return (
    <>
      <GrpcQueryProvider>
        <ExampleApplication />
      </GrpcQueryProvider>
    </>
  );
}

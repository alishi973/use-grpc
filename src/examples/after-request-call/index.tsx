import React from "react";
import { GrpcQueryProvider, useGRPC } from "../../lib";
import { api, GrpcQueryOption } from "./config";

const ExampleApplication = () => {
  const { data, call } = useGRPC(api.sayHello);

  return (
    <div>
      This is Simple Request example for use-grpc
      <button onClick={call}>Fetch data!</button>
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
      <GrpcQueryProvider option={GrpcQueryOption}>
        <ExampleApplication />
      </GrpcQueryProvider>
    </>
  );
}

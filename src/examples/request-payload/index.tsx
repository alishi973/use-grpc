import React from "react";
import { api } from "./config";
import { GrpcQueryProvider, useGRPC } from "../../lib";

const ExampleApplication = () => {
  const { data, error, call } = useGRPC(api.sayHello);

  const handleOnFetchDataClick = () => {
    call({ greeting: "Hi From Caller function" });
  };

  return (
    <div>
      This is Simple Request example for use-grpc
      <button onClick={handleOnFetchDataClick}>Fetch data!</button>
      <code>
        <p>Response will show here:</p>
        {JSON.stringify(data)}
        <p>Error will show here:</p>
        {JSON.stringify(error)}
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

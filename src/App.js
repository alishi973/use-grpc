import React from "react";
import { useGRPC } from "./lib";

export default function App() {
  const { state } = useGRPC();
  return (
    <div>
      This is Development Page!
      <p>{state}</p>
    </div>
  );
}

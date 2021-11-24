import { useState } from "react";

export default function useGRPC() {
  const [state, setState] = useState();

  return { state };
}

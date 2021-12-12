import { useContext, useEffect, useState } from "react";
import { Metadata, UnaryResponse } from "grpc-web";
import { GrpcQueryContext } from "./GrpcQueryProvider";

interface ServiceClientType { new(url: string): any }
interface Model { Request: any, Response: any }

const useGRPC = <T extends ServiceClientType, RequestModel extends Model>(serviceClient: T, model: RequestModel, method: keyof InstanceType<T>) => {
  const [state, setState] = useState();
  const options = useContext(GrpcQueryContext)
  const payload = new model.Request()
  const meta: Metadata = {}

  useEffect(() => {
    const client = new serviceClient(options.baseUrl)
    // client[method](payload, meta).then((data: any) => {
    //   setState(data)
    // })
    client[method](payload, meta).then((data: typeof model.Response) => {
      setState(data.toObject?.())
    })
  }, [])

  return { state };
}

export default useGRPC;
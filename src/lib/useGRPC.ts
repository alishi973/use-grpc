import { useContext, useEffect, useState } from "react";
import { GrpcQueryContext } from "./GrpcQueryProvider";
import { ApiCallResponseToObjectReturnType, ClientReturnType } from "./model";

export const createService = <T extends new (...args: any) => InstanceType<T>>(client: T, baseUrl: string) => new client(baseUrl);

function useProviderValue() {
  const context = useContext(GrpcQueryContext);
  if (context === undefined) {
    throw new Error("useGRPC must be used within a GrpcQueryProvider");
  }
  return context;
}

const useGRPC = <TApi, TReqParam, TRes extends ApiCallResponseToObjectReturnType<TApi>>(api: ClientReturnType<TApi, TReqParam>, payload?: TReqParam): { call: (param: TReqParam) => any, data?: TRes, error: string, isLoading: boolean, isLoaded: boolean } => {
  const option = useProviderValue();
  const [data, setData] = useState<TRes>()
  const [error, setError] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (api.autoCall === true) call(payload ?? {} as TReqParam)
  }, [])

  const call = async (params: TReqParam) => {
    setIsLoading(true)
    setIsLoaded(false)
    const request = api.payload(params)
    const client = api.client as unknown as Function
    try {
      const response = await client(request, {})
      setData(response?.toObject?.())
      setIsLoaded(true)
    } catch (e) {
      console.error(e)
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoaded, isLoading, error, call }
}


export default useGRPC;
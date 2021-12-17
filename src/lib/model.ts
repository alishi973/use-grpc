import { Metadata, RpcError } from "grpc-web";

type BaseClient<TApi> = TApi extends ((request: infer TReq, metadata: Metadata) => Promise<infer TRes>)
    | ((request: infer TReq, metadata: Metadata, callback: (err: RpcError, response: infer TRes) => void) => void) ? { Req: TReq, Res: TRes } : any;

export interface ClientReturnType<TApi, TReqParam> {
    client: TApi;
    autoCall?: boolean;
    payload: (params: TReqParam) => InstanceType<new () => BaseClient<TApi>["Req"]>
}
export type ApiCallResponseToObjectReturnType<TApi> = BaseClient<TApi>["Res"] extends { toObject: () => infer TObj } ? TObj : unknown;
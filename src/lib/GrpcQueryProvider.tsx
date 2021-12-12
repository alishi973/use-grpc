import * as React from "react";

export interface GrpcQueryOption {
  baseUrl: string;
}
type GrpcQueryProviderTypes = {
  children: React.ReactNode;
  option: GrpcQueryOption;
};

export const GrpcQueryContext = React.createContext<GrpcQueryOption>({ baseUrl: "" });

function GrpcQueryProvider({ children, option }: GrpcQueryProviderTypes) {
  return (
    <GrpcQueryContext.Provider value={option}>
      {children}
    </GrpcQueryContext.Provider>
  );
}

function useCount() {
  const context = React.useContext(GrpcQueryContext);
  if (context === undefined) {
    throw new Error("useGRPC must be used within a GrpcQueryProvider");
  }
  return context;
}

export default GrpcQueryProvider;

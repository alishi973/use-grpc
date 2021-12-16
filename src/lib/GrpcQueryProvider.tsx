import * as React from "react";

export interface GrpcQueryOption {
  baseUrl: string;
}

type GrpcQueryProviderTypes = {
  children: React.ReactNode;
};

export const GrpcQueryContext = React.createContext<{}>({});

function GrpcQueryProvider({ children }: GrpcQueryProviderTypes) {
  const value = {};
  return (
    <GrpcQueryContext.Provider value={value}>
      {children}
    </GrpcQueryContext.Provider>
  );
}

export default GrpcQueryProvider;

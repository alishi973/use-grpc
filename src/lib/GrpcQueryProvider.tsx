import * as React from "react";

export interface GrpcQueryOptionType {
  headers?: { [key: string]: string | number };
  beforeCall?: (
    config: Omit<GrpcQueryOptionType, "beforeCall">
  ) => GrpcQueryOptionType;
  afterCall?: () => void;
}

interface GrpcQueryProviderTypes {
  children: React.ReactNode;
  option?: GrpcQueryOptionType;
}

export const GrpcQueryContext = React.createContext<{
  option?: GrpcQueryOptionType;
}>({ option: undefined });

function GrpcQueryProvider({ children, option }: GrpcQueryProviderTypes) {
  const value = { option };
  return (
    <GrpcQueryContext.Provider value={value}>
      {children}
    </GrpcQueryContext.Provider>
  );
}

export default GrpcQueryProvider;

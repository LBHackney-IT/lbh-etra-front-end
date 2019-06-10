import React from "react";
import { IServiceProvider } from "./ServiceContainer";

export const ServiceContext = React.createContext<IServiceProvider | null>(null);
export const ServiceProvider = ServiceContext.Provider;
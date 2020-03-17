import * as React from "react";
import { RouteConfig } from "react-router-config";

export interface AppPlatformAPI {
    name: string;
    version: string;
}

export interface ApplicationLayout {
    Layout: JSX.Element;
}

export interface Application {
    Routes: RouteConfig[];
}
import React from "react";

interface ActiveOnRoute {
    route: string;
    end: boolean;
}

export interface MenuItem {
    id?: string;
    key: string;
    label?: string;
    renderItem?: (openOrClosedClassName: string) => React.ReactNode;
    icon?: React.ReactNode;
    route?: string;
    activeOnRoutes?: ActiveOnRoute[];
    children?: MenuItem[];
}

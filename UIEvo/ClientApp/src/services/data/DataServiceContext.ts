import * as React from "react";
import { IDataService } from "./IDataService";
import DataService from "./DataService";

export const DataServiceDefault: IDataService = new DataService();
export const DataServiceContext = React.createContext<IDataService>(DataServiceDefault);
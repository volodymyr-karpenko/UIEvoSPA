import { IAddEditPortfolioPost } from "../../features/admin/IAddEditPortfolioPost";
import { IPortfolioPost } from "../../features/portfolio/IPortfolioPost";
import { IAntiForgeryData } from "../auth/IAntiForgeryData";

export interface IDataService {

    createDataAsync(item: IAddEditPortfolioPost, antiForgeryData: IAntiForgeryData): Promise<string>;

    readAllDataAsync(): Promise<IPortfolioPost[]>;

    readDataAsync(id: string): Promise<IPortfolioPost>;

    updateDataAsync(item: IAddEditPortfolioPost, antiForgeryData: IAntiForgeryData): Promise<string>;

    deleteDataAsync(id: string, antiForgeryData: IAntiForgeryData): Promise<string>;
}
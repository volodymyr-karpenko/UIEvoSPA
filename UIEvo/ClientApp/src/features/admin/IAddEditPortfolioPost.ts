import { IPortfolioPost } from "../portfolio/IPortfolioPost";

export interface IAddEditPortfolioPost extends IPortfolioPost {

    startDateInput: string;

    finishDateInput: string;  

    attachment?: File;
}
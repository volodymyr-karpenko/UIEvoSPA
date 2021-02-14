import { IDataService } from "./IDataService";
import { IPortfolioPost } from "../../features/portfolio/IPortfolioPost";
import { IAddEditPortfolioPost } from "../../features/admin/IAddEditPortfolioPost";
import { IAntiForgeryData } from "../auth/IAntiForgeryData";

export default class DataService implements IDataService {

    public constructor() {
        this.createDataAsync = this.createDataAsync.bind(this);
        this.readAllDataAsync = this.readAllDataAsync.bind(this);
        this.readDataAsync = this.readDataAsync.bind(this);
        this.updateDataAsync = this.updateDataAsync.bind(this);
        this.deleteDataAsync = this.deleteDataAsync.bind(this);
    }

    public async createDataAsync(item: IAddEditPortfolioPost, antiForgeryData: IAntiForgeryData): Promise<string> {
        const headers: string[][] = [[antiForgeryData.antiForgeryHeader, antiForgeryData.antiForgeryToken]];
        let formData = new FormData();

        for (let [key, value] of Object.entries(item)) {
            if (key === "attachment" && value !== undefined) {
                formData.set(`${key}`, value);
            }
            else if (key === "attachment" && value === undefined) {
                continue;
            }
            else {
                formData.set(`${key}`, `${value}`);
            }
        }

        formData.set(`_${antiForgeryData.antiForgeryHeader}`, antiForgeryData.antiForgeryToken);

        const response = await fetch("api/portfolio/create", {
            method: "POST",
            headers: headers,
            body: formData
        });

        const res: string = await response.text();
        return res;
    }

    public async readAllDataAsync(): Promise<IPortfolioPost[]> {
        const response = await fetch("api/portfolio/readall", {
            method: "GET"
        });

        const post: IPortfolioPost[] = await response.json();
        return post;
    }

    public async readDataAsync(id: string): Promise<IPortfolioPost> {
        const headers: string[][] = [["Content-Type", "application/json"]];
        const response = await fetch("api/portfolio/read", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id: id })
        });

        const post: IPortfolioPost = await response.json();
        return post;
    }

    public async updateDataAsync(item: IAddEditPortfolioPost, antiForgeryData: IAntiForgeryData): Promise<string> {
        const headers: string[][] = [[antiForgeryData.antiForgeryHeader, antiForgeryData.antiForgeryToken]];
        let formData = new FormData();

        for (let [key, value] of Object.entries(item)) {
            if (key === "attachment" && value !== undefined) {
                formData.set(`${key}`, value);
            }
            else if (key === "attachment" && value === undefined) {
                continue;
            }
            else {
                formData.set(`${key}`, `${value}`);
            }
        }

        formData.set(`_${antiForgeryData.antiForgeryHeader}`, antiForgeryData.antiForgeryToken);

        const response = await fetch("api/portfolio/edit", {
            method: "PUT",
            headers: headers,
            body: formData
        });

        const res: string = await response.text();
        return res;
    }

    public async deleteDataAsync(id: string, antiForgeryData: IAntiForgeryData): Promise<string> {
        const headers: string[][] = [["Content-Type", "application/json"], [antiForgeryData.antiForgeryHeader, antiForgeryData.antiForgeryToken]];

        const response = await fetch("api/portfolio/delete", {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify({ id: id })
        });

        const res: string = await response.text();
        return res;
    }    
}
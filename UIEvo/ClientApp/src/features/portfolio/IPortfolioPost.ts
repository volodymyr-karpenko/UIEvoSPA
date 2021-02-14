export interface IPortfolioPost {

    id: string;

    header: string;

    customerTitle?: string;

    location?: string;

    startDate?: Date;

    finishDate?: Date;       

    imageSource?: string;

    videoSource?: string;

    mainText?: string;

    playStoreSource?: string;

    playStoreText?: string;

    appStoreSource?: string;

    appStoreText?: string;

    footer?: string;
}
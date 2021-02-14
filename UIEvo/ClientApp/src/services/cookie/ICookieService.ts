export interface ICookieService {

    getCookie(cookieName: string): string;

    setCookie(cookieName: string, cookieValue: string, expDays: number, pathOption: string, samesiteOption: string): void;
}
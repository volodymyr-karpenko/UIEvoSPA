import { ICookieService } from "./ICookieService";

export default class CookieService implements ICookieService {

    public constructor() {
        this.getCookie = this.getCookie.bind(this);
        this.setCookie = this.setCookie.bind(this);
    }

    public getCookie(cookieSearch: string): string {
        const cookieName = cookieSearch + "=";
        let cookieValue = "";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(cookieName) === 0) {
                cookieValue = c.substring(cookieName.length, c.length);
            }
        }
        return cookieValue;
    }

    public setCookie(cookieName: string, cookieValue: string, expDays: number, pathOption: string, samesiteOption: string): void {
        const d = new Date();
        d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=" + pathOption + ";samesite=" + samesiteOption;
    }
}
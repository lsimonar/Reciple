export class TodayDateHelper {
    
    static leftpad(val: any, resultLength = 2, leftpadChar = '0'): string {
        return (String(leftpadChar).repeat(resultLength)
        + String(val)).slice(String(val).length);
    }

    static getTodaysDateString(): string {
        var date = new Date();
        return this.leftpad(date.getDate(), 2)+'/'+this.leftpad(date.getMonth() + 1, 2)+'/'+date.getFullYear();
    }
}
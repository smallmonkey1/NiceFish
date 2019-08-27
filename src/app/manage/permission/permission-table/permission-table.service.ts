import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class PermissionTableService {
    constructor(public httpClient: HttpClient) { }

    public getPermissionTable(dataURL: string): Observable<any> {
        return this.httpClient.get(dataURL);
    }

    public del(delURL:string): Observable<any> {
        return this.httpClient.delete(delURL);
    }

    public toEdit(editURL:string): Observable<any> {
        return this.httpClient.get(editURL);
    }
}
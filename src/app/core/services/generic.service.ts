// import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  apiUrl: string = environment.baseUrl;
  timeoutDuration: number = 5000;
  constructor(private httpClient: HttpClient) {}

  public Get<T>(
    url: string,
    params?: {
      page?: number;
      limit?: number;
      search?: string;
      sortField?: string;
      sortOrder?: string;
    },
  ): Observable<T> {
    return this.httpClient.get<T>(this.apiUrl + url);
  }

  public Post(url: string, data: any, options: any = {}): Observable<any> {
    return this.httpClient.post(this.apiUrl + url, data, options);
  }

  public Put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(this.apiUrl + url, data);
  }

  public PutWithResponse(url: string, data: unknown): Observable<HttpResponse<unknown>> {
    return this.httpClient.put<unknown>(this.apiUrl + url, data, { observe: 'response' });
  }

  public Patch<T>(url: string, data: any): Observable<T> {
    return this.httpClient.patch<T>(this.apiUrl + url, data);
  }

  public DeleteRequest<T>(requestUrl: string): Observable<T> {
    return this.httpClient.delete<T>(this.apiUrl + requestUrl);
  }

  public DownloadFile(requestUrl: string, options: any): any {
    return this.httpClient.get(this.apiUrl + requestUrl, options);
  }
}

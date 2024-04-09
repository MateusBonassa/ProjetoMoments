import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/Comment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private BaseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.BaseApiUrl}api/moments`;
  constructor(private http:HttpClient) { }

  createComment(data:Comment):Observable<Response<Comment>>{
    console.log(data);
    const url = this.apiUrl + `/${data.momentId}/comments`;
    return  this.http.post<Response<Comment>>(url,data);
  }
}

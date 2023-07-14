import { Injectable } from '@angular/core';
import { BookDetails } from './book-details';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelserviceService {

  constructor(private http : HttpClient) { }

  refresh = new Subject<void>();
  get Refresh(){
    return this.refresh;
  }
  bookDetails : BookDetails[] = [];
  url1 = "http://localhost:8088/"
  getAllExcelData() : Observable<BookDetails[]>{
    return this.http.get<BookDetails[]>(this.url1+"allBooks");
  }

  uploadExcelFile(formData : FormData){
      this.http.post<any>(this.url1+"books/upload",formData).pipe(tap(()=>this.Refresh.next())).subscribe();
    }
}

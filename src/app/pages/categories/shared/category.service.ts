import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories"

  constructor(private http: HttpClient){}

  public getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  public getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  public create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  public update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category) 
    )
  }

  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // o que está vindo é sempre any, tem que converter
  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category
  }

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = []
    jsonData.forEach(item => categories.push(item as Category))
    return categories
  }

  private handleError(error: any): Observable<any> {
    console.error("error: ", error)
    return throwError(error)
  }
}

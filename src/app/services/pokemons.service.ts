import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from'@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
  private urlDetail = `https://pokeapi.co/api/v2/pokemon/` 

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getDetail(id: any): Observable<any>{
    return this.http.get<any>(`${this.urlDetail}${id}`)
  }


}

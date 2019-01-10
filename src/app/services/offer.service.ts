import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OfferEndpoint } from '../endpoints/offer.endpoint';
import { Offer } from '../models/offer';

@Injectable({ providedIn: 'root' })
export class OfferService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Offer[]> {
    return this.http.get<any>(OfferEndpoint.GET_ALL_OFFERS).pipe(
      map(response => response.map(obj => {
        const offer: Offer = {
          id: obj._id,
          title: obj.name,
          description: obj.description,
          price: obj.price,
          seller: obj.seller,
          categories: obj.category
        };
        return offer;
      }))
    );
  }

  public addOffer(offer: Offer): Observable<boolean> {
    return this.http.post<boolean>(OfferEndpoint.ADD,
      { name: offer.title, description: offer.description, price: offer.price, seller: offer.seller, category: offer.categories },
      {headers: {'Content-Type': 'application/json'}});
  }
}

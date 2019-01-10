import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OfferEndpoint } from '../endpoints/offer.endpoint';
import { Offer } from '../models/offer';

@Injectable({ providedIn: 'root' })
export class OfferService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Offer[]> {
    return this.http.get<Offer[]>(OfferEndpoint.GET_ALL_OFFERS);
  }

  public addOffer(offer: Offer): Observable<boolean> {
    return this.http.post<boolean>(OfferEndpoint.ADD,
      { name: offer.title, description: offer.description, price: offer.price, seller: offer.seller, category: offer.categories },
      {headers: {'Content-Type': 'application/json'}});
  }
}

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

  public addOffer(offer: Offer): Observable<Boolean> {
    return this.http.post<Boolean>(OfferEndpoint.ADD, { offer: offer });
  }
}

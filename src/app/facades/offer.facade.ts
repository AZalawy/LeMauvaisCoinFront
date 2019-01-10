import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';

@Injectable({ providedIn: 'root' })
export class OfferFacade {
  public constructor(private offerService: OfferService) {}

  public getAll(): Observable<Offer[]> {
    return this.offerService.getAll();
  }

  public add(offer: Offer): Observable<boolean> {
    offer.seller = 'plop';
    return this.offerService.addOffer(offer);
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Add } from '../actions/offer.actions';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';

@Injectable({ providedIn: 'root' })
export class OfferFacade {
  public constructor(private store: Store<any>, private offerService: OfferService) {}

  public getAll(): Observable<Offer[]> {
    return this.offerService.getAll();
  }

  public add(offer: Offer): void {
    this.store.dispatch(new Add(offer));
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';

@Injectable({ providedIn: 'root' })
export class OfferFacade {
  public constructor(private router: Router, private offerService: OfferService) {}

  public getAll(): Observable<Offer[]> {
    return this.offerService.getAll();
  }

  public add(offer: Offer): Observable<boolean> {
    offer.seller = 'plop';
    return this.offerService.addOffer(offer).pipe(tap(x => this.router.navigate(['/home'])));
  }

  public delete(id: string): Observable<boolean> {
    return this.offerService.deleteOffer(id);
  }
}

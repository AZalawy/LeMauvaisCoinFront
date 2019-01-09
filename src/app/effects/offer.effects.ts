import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { Add, OfferActions } from '../actions/offer.actions';
import { OfferService } from '../services/offer.service';

@Injectable()
export class OfferEffects {

  @Effect({dispatch: false})
  public add$ = this.actions$.pipe(
    ofType<Add>(OfferActions.Add),
    map(action => {
      this.offerService.addOffer(action.offer);
    })
  );

  public constructor(private actions$: Actions, private offerService: OfferService) {}
}

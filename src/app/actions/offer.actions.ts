import { Action } from '@ngrx/store';

import { Offer } from '../models/offer';

export enum OfferActions {
  Add = '[Offer] Add',
}

export class Add implements Action {
  public readonly type = OfferActions.Add;

  public constructor(public readonly offer: Offer) {}
}

export type OfferActionsTypes = Add;

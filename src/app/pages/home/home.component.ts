import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferFacade } from 'src/app/facades/offer.facade';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  offers$: Observable<Offer[]>;

  constructor(private offerFacade: OfferFacade) { }

  ngOnInit() {
    this.offers$ = this.offerFacade.getAll();
  }

  public deleteOffer(id: string): void {
    this.offerFacade.delete(id);
  }

}

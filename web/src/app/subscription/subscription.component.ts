import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  isEmailerror: Boolean = false;
  isSubscribed: Boolean = false;

  constructor(private subService: SubscribersService) { }

  ngOnInit(): void { }

  onSubmit(formVal: any) {
    const subData: Sub = {
      name: formVal.name,
      email: formVal.email,
      feedback: formVal.feedback,
    }

    this.subService.checkSubs(subData.email).subscribe(val => {
      if (val.empty) {
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      } else {
        this.isEmailerror = true;
      }
    });
  }
}

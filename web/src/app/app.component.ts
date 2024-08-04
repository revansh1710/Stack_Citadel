import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showCategoryNavbar: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let child = this.activatedRoute.firstChild;
      while (child?.firstChild) {
        child = child.firstChild;
      }
      this.showCategoryNavbar = child?.snapshot.data['showCategoryNavbar'] || false;
    });
  }
}

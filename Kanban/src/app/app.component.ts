import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation]
})
export class AppComponent {

  ToolBar: boolean = true;

  constructor(private _router: Router){
    this._router.events.subscribe(val => this.ToolBar = !this._router.url.includes('home'));
  }

}

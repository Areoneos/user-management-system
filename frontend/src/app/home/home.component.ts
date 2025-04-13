import { Component } from "@angular/core";

import { AccountService } from "@app/_service";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent {
  account = this.accountService.accountValue;

  constructor(private accountService: AccountService) {}
}

import { Component } from "@angular/core";

import { Account, Role } from "./_models";
import { AccountService } from "./_services";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent {
  Role = Role;
  account: Account;

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe((x) => (this.account = x));
  }

  logout() {
    this.accountService.logout();
  }
}

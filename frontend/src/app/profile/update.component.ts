import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

import { MustMatch } from "@app/_helpers";
import { AccountService, AlertService } from "@app/_services";
import { Account } from "@app/_models";

@Component({ templateUrl: "update.component.html" })
export class UpdateComponent implements OnInit {
  account: Account = this.accountService.accountValue || {} as Account;
  form!: UntypedFormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        title: [this.account?.title || "", Validators.required],
        firstName: [this.account?.firstName || "", Validators.required],
        lastName: [this.account?.lastName || "", Validators.required],
        email: [this.account?.email || "", [Validators.required, Validators.email]],
        password: ["", [Validators.minLength(6)]],
        confirmPassword: [""],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .update(this.account.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success("Update successful", {
            keepAfterRouteChange: true,
          });
          this.router.navigate(["../"], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }

  onDelete() {
    if (confirm("Are you sure?")) {
      this.deleting = true;
      this.accountService
        .delete(this.account.id)
        .pipe(first())
        .subscribe(() => {
          this.alertService.success("Account deleted successfully", {
            keepAfterRouteChange: true,
          });
        });
    }
  }
}
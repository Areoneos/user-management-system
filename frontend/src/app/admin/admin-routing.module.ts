import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./layout.component";
import { OverviewComponent } from "./overview.component";
import { SubNavComponent } from "./subnav.component";

const accountsModule = () =>
  import("./accounts/accounts.module").then((x) => x.AccountsModule);

const routes: Routes = [
  { path: "", component: SubNavComponent, outlet: "subnav" },
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", component: OverviewComponent },
      { path: "accounts", loadChildren: accountsModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // Subscribe to alert observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(
      filter(alert => alert && alert.id === id)
    );
  }

  // Core alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
    alert.keepAfterRouteChange = alert.keepAfterRouteChange === undefined ? false : alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  // Convenience methods
  success(message: string, options?: Partial<Alert>) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  error(message: string, options?: Partial<Alert>) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: Partial<Alert>) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: Partial<Alert>) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // Clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}

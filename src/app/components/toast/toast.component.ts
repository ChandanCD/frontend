import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
  <ngb-toast
    *ngFor="let toast of toastService.toasts"
    [header]="toast.headertext"
    [class]="toast.classname"
    [autohide]="toast.autohide"
    [delay]="toast.delay || 5000"
    (hide)="toastService.remove(toast)"
  >
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
      <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
    </ng-template>

    <ng-template #text>{{ toast.textOrTpl }}</ng-template>
  </ngb-toast>
`,
host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastComponent {

  constructor(public toastService: ToastService) {}

  /**
   * Determines whether template is
   * @param toast 
   * @returns  
   */
  isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }

}

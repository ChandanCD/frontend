import { Injectable, TemplateRef  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: any[] = [];

  /**
   * Shows toast service
   * Push new Toasts to array with content and options
   * @param textOrTpl 
   * @param [options] 
   */
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  /**
   * Removes toast service
   * Callback method to remove Toast DOM element from view
   * @param toast 
   */
  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}

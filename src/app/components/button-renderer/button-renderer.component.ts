import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CsvServiceService } from 'src/app/services/csv-service.service';

import { PopupComponent } from '../popup/popup.component';
import { ToastService } from '../../services/toast.service';


export interface CustomParams {
  label?: string;
}
@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.css']
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  public params: any;
  public isNew: any;
  public addRow: any;
  public previousData: any;
  public componentParent: any = false;

  /**
   * init
   * @param params 
   */
  agInit(params: any): void {
      this.params = params; 
  }
   
   /**
    * Creates an instance of button renderer component.
    * @param csvService 
    * @param modalService 
    * @param toastService 
    */
   constructor(
    private csvService: CsvServiceService, 
    private modalService: NgbModal,
    public toastService: ToastService
    ) {
      this.isNew = true;
      this.addRow = false;
  }

  /**
   * Refreshs button renderer component
   * @returns true if refresh 
   */
  refresh(): boolean {
      return false;
  }
  /*
  set all cell of current row into edit mode
  */
  onEditClick() {
    const modalRef = this.modalService.open(PopupComponent,
      { scrollable: true, size: "lg" });
    
    modalRef.componentInstance.toUpdate = true;
    modalRef.componentInstance.fromParent = this.params.data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

}

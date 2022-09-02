import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CsvServiceService } from 'src/app/services/csv-service.service';


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
  previousData: any;
  componentParent: any = false;

  agInit(params: any): void {
      this.params = params; 
  }
  
   constructor(private csvService: CsvServiceService) {
      this.isNew = true;
      this.addRow = false;
  }

  refresh(): boolean {
      return false;
  }
  
  onEditClick() {
    this.componentParent = this.params.context.componentParent;

    this.isNew = false;
    this.previousData = JSON.parse(JSON.stringify(this.params.node.data));
    let cols = this.params.columnApi.getAllGridColumns();
    let firstCol = {
        "colId": ""
    }
    if (cols) {
        firstCol = cols[0];
    }
    let rowIndex = this.params.node.rowIndex;
    this.params.api.setFocusedCell(rowIndex, firstCol.colId);
    this.params.api.startEditingCell({
        rowIndex: rowIndex,
        colKey: "nodeId"
    });
  }

  onUpdateClick() {
    this.params.api.stopEditing();
    this.isNew = true;
    
    if (this.componentParent) {
      this.csvService.create(this.params.data).subscribe((data: any)=>{
        console.info(data);
      })
      this.params.context.componentParent =  false;
    }else{
      this.csvService.update(this.params.data).subscribe((data: any)=>{
        console.info(data);
      })
    }


  }

  public onCancelClick() {
      this.isNew = true;
      this.params.node.setData(this.previousData);
      this.params.api.stopEditing(true);
  }
  
  onDeleteClick() {
    const selectedData = [this.params.node.data];
    this.params.api.applyTransaction({ remove: selectedData });
    this.csvService.delete(selectedData[0].id).subscribe((data: any)=>{
      console.info(data.message);
    })
  }



}

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

  // gets called once before the renderer is used 
  agInit(params: any): void {
      this.params = params; 
  }
  
   constructor(private csvService: CsvServiceService) {
      this.isNew = true;
      this.addRow = false;
  }

  // gets called whenever the cell refreshes
  refresh(): boolean {
      return false; // do not refresh table on cell edit
  }
  /*
  set all cell of current row into edit mode
  */
  onEditClick() {
    this.componentParent = this.params.context.componentParent;

    this.isNew = false;
    // keep the existing data in previous data
    // on cancel previous data can be restored
    this.previousData = JSON.parse(JSON.stringify(this.params.node.data));
    let cols = this.params.columnApi.getAllGridColumns();
    let firstCol = {
        "colId": ""
    }
    if (cols) {
        firstCol = cols[0];
    }
    // current row index number
    let rowIndex = this.params.node.rowIndex;
    this.params.api.setFocusedCell(rowIndex, firstCol.colId);
    // set current row into edit mode
    this.params.api.startEditingCell({
        rowIndex: rowIndex,
        colKey: "nodeId"
    });
  }
  /*
  trigers stopediting 
  based on parent context decide whether to update or add new data in csv
  */
  onUpdateClick() {
    this.params.api.stopEditing();
    this.isNew = true;
    
    if (this.componentParent) {
      // create new record in csv
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
  /*
  sets previous data back
  triggers stop editing in ag-grid
  */
  public onCancelClick() {
      this.isNew = true;
      this.params.node.setData(this.previousData);
      this.params.api.stopEditing(true);
  }
  
  /*
  removes selected row from ag-grid
  send post request to delete from csv file based on id
  */
  onDeleteClick() {
    const selectedData = [this.params.node.data];
    this.params.api.applyTransaction({ remove: selectedData });
    this.csvService.delete(selectedData[0].id).subscribe((data: any)=>{
      console.info(data.message);
    })
  }



}

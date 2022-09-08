import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';
import { CsvServiceService } from './services/csv-service.service';
import { Csvdata, DataEntity } from './interfaces/csvdata';
import { CreateComponent } from './components/create/create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'frontend';

  public columnDefs: ColDef[];
  public rowData: DataEntity[] = [];
  public context: any;
  public frameworkComponents;
  public editType;
  public defaultColDef: ColDef;
  public domLayout: 'normal' | 'autoHeight' | 'print' = 'autoHeight';
  public tableTitle : string = "Online Test";
  
  /**
   * Creates an instance of app component.
   * @param csvService 
   * @param modalService 
   */
  constructor(private csvService: CsvServiceService, 
    private modalService: NgbModal
    ) {
    /**
     * define each column in columnDefs
     * headerName : table column name
     * field : name of the field
     * editable : can be true or false
     * type : type of data allowed in cell
     * cellRenderer : renders component 
     */
    
    this.columnDefs = [
    { headerName: 'nodeId', field: 'nodeId', valueGetter: `parseInt(node.id)` },
    { field: 'id' },
    { field: 'name',  editable: true },
    { field: 'state' ,  editable: true},
    { field: 'zip',  editable: true , type: 'numericColumn'},
    { field: 'amount',  editable: true , type: 'numericColumn'},
    { field: 'qty',  editable: true , type: 'numericColumn' },
    { field: 'item',  editable: true },
    {
        headerName: "Actions",
        field: "action",
        cellRenderer: "rowEditCRenderer" // render ButtonRendererComponent
    }
    ];
    
    this.editType = "fullRow";
    
    this.frameworkComponents = {
    rowEditCRenderer: ButtonRendererComponent
   
    };
    
    /**
     * Default configuration for ag grid table
     */
    this.defaultColDef = {
            sortingOrder: ["asc", "desc"],
            sortable:true
        };

      this.context = {
          componentParent: false
      }
  }

  ngOnInit() {
    this.getAllData();
  }

  /**
   * subscribe to csvService , update rowData
   * @return {void} returns nothing
   */
  getAllData = () => {
    this.csvService.getCsvData().subscribe((response: Csvdata) => {
      this.rowData = response.data? response.data: [];
    })
  }
  /**
   * opens form modal to add new post
   * @return {void} returns nothing
   */
   openModal = () => {
    // open CreateComponent (modal component)
    // should be scrollable and large
    const modalRef = this.modalService.open(CreateComponent,
      { scrollable: true, size: "lg" });
    
    modalRef.componentInstance.toUpdate = false;
    // intially send empty value to child
    modalRef.componentInstance.fromParent = {};
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  
}


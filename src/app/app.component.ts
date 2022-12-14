import { Component } from '@angular/core';
import { CheckboxSelectionCallbackParams, ColDef, GridApi, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';
import { CsvServiceService } from './services/csv-service.service';
import { Csvdata, DataEntity } from './interfaces/csvdata';
import { PopupComponent } from './components/popup/popup.component';

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
  public tableTitle : string = "GreenIT Application Challenge";
  public paginationPageSize: number = 10;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi;
  
  /**
   * Creates an instance of app component.
   * @param csvService 
   * @param modalService 
   * @param translate
   */
  constructor(private csvService: CsvServiceService, 
    private modalService: NgbModal,
    translate: TranslateService
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
    { headerName: 'nodeId', field: 'nodeId', valueGetter: `parseInt(node.id)`, hide: true },
    { headerName: 'Id',field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'State',field: 'state' },
    { headerName: 'Zip',field: 'zip' },
    { headerName: 'Amount',field: 'amount'},
    { headerName: 'Quantity',field: 'quantity' },
    { headerName: 'Item',field: 'item' },
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
            sortable:true,
            filter: true,
            headerCheckboxSelection: this.isFirstColumn,
            checkboxSelection: this.isFirstColumn,
        };

      /**
       * ag grid context that can be passed to child component
       */
      this.context = {
          componentParent: false
      }

      translate.addLangs(['en']);
      translate.setDefaultLang('en');
      translate.use('en');
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
    // open PopupComponent (modal component)
    // should be scrollable and large
    const modalRef = this.modalService.open(PopupComponent,
      { scrollable: true, size: "lg" });
    
    modalRef.componentInstance.toUpdate = false;
    // intially send empty value to child
    modalRef.componentInstance.fromParent = {};
    modalRef.result.then((response) => {
    }, (reason) => {});
  }

  /**
   * Determines whether grid ready on
   * @param params 
   */
  onGridReady(params: { api: GridApi<any>; }) {
    this.gridApi = params.api;
  }

  isFirstColumn(
    params:
      | CheckboxSelectionCallbackParams
      | HeaderCheckboxSelectionCallbackParams
  ) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  deleteSelectedOrder(){
    const selectedData = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({ remove: selectedData });
    this.csvService.multipleOrderDelete(selectedData).subscribe((data: any)=>{
      console.info(data.message);
    });
  }

  
}


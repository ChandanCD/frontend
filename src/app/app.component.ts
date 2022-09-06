import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';
import { CsvServiceService } from './services/csv-service.service';


interface CsvData {
  id: number;
  name: string;
  state: string;
  zip: number;
  amount: number;
  qty: number;
  item: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  private gridApi!: { getCellRendererInstances: () => any; };
  private gridColumnApi: any;

  public columnDefs: ColDef[];
  
  public rowData: CsvData[] = [];
  public context: any;
  public frameworkComponents;
  public editType;
  public defaultColDef: ColDef;
  public domLayout: 'normal' | 'autoHeight' | 'print' = 'autoHeight';

  constructor(private csvService: CsvServiceService) {
    this.columnDefs = [
    { headerName: 'nodeId', field: 'nodeId', valueGetter: `parseInt(node.id)` },
    { field: 'id' },
    { field: 'name',  editable: true },
    { field: 'state' ,  editable: true},
    { field: 'zip',  editable: true },
    { field: 'amount',  editable: true },
    { field: 'qty',  editable: true },
    { field: 'item',  editable: true },
      {
        headerName: "Actions",
        field: "action",
        cellRenderer: "rowEditCRenderer",
        width: 200
      }
    ];
    
    this.editType = "fullRow";
    
    this.frameworkComponents = {
    rowEditCRenderer: ButtonRendererComponent
   
    };
    
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

  onGridReady(params: { api: { getCellRendererInstances: () => any; }; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }

  addRowData = () => {
    this.context.componentParent = true;
    let newRowData = this.rowData.slice();
    let newId =
      this.rowData.length === 0
        ? 0
        : (+this.rowData[this.rowData.length - 1].id) + 1; //convert string to number and increament
        
    let newRow = { id: newId, name: 'add name', state: 'add state', zip: 0, amount: 0, qty: 0, item: 'add item' };

    // append at the begining of array
    newRowData.unshift(newRow);
    this.rowData = newRowData;
  };

  getAllData = () => {
    this.csvService.getCsvData().subscribe((data: CsvData[]) => {
      this.rowData = data;
    })
  }

  
}


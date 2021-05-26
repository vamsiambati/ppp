import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, Output, ViewChild ,EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
export interface DynamicMatTableColumn {
  name: string;
  key:string
}
@Component({
  selector: 'app-mtb',
  templateUrl: './mtb.component.html',
  styleUrls: ['./mtb.component.scss']
})
export class MtbComponent implements AfterViewInit,OnChanges,OnInit {
  @Input() displayedHeadersWithKey: DynamicMatTableColumn[];
  @Input() dataSource:MatTableDataSource<any>;
  @Input() pageSizeOptions:Number[]
  displayedColumns :string[]
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() selectionModel:SelectionModel<any>;

  @Output() selectedRows = new EventEmitter<any[]>();
  initialSelectedRows :any[]
  selection:SelectionModel<any>;
constructor(private cd: ChangeDetectorRef){}
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if(this.isAllSelected()){
      this.selection.clear() 
    } else{
      this.selection.clear() 
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
        
  }
  ngOnInit(){
    //console.log(this.selection.selected)
    this.selectedRows.emit(this.selection.selected)
    this.selection.changed.subscribe(x=>{
      console.log(this.selection.selected)
    })
    
  }
 ngOnChanges(){ 
   
   this.displayedColumns =['select']
  this.displayedHeadersWithKey.forEach(e=>{
    this.displayedColumns.push(e.key)
  })
  console.log(this.displayedColumns);
  this.selection = this.selectionModel
if(this.selection.selected.length>0){
  this.initialSelectedRows = this.selection.selected
  this.selection.clear();
  let filteredRows = []
  this.initialSelectedRows.forEach(row=>{
    let rr = this.dataSource.data.find(dataRow=>{
      return dataRow == row
    })
    if(rr){
      filteredRows.push(rr);
    }
  })
  filteredRows.forEach(row=>{
    this.selection.select(row)
  })
}
 }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}


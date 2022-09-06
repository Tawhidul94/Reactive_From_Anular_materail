import { Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','comment','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  title = 'metrial_crud';

  constructor(public dialog: MatDialog,private api :ApiService) {}
  
  ngOnInit(){
    this. getAllproduct();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%',
    }).afterClosed().subscribe((res)=>{
      if(res == 'save'){
        this.getAllproduct();
      }
    }
    );
    
  }

  getAllproduct(){
    this.api.getProduct().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (err)=>{
      alert("Error while fetching the data !!");
    }
    )
  }

  

  editProduct(row : any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data : row
      }).afterClosed().subscribe((res)=>{
        if(res == 'update'){
          this.getAllproduct();
        }
      }
      );
  } 

 
  deleteproduct(id : number){
    this.api.deleteProduct(id).subscribe((res)=>{
      alert("Product Deleted Successfully");
      this.getAllproduct();
    },
    (err)=>{
      alert("Error while deleting the data !!");
    }
    )
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

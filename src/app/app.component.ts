import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular13Crud';

  displayedColumns: string[] = ['productName', 'category', 'price', 'freshness','comment','date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private dialog:MatDialog,private api:ApiService){

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%' 
    });
  }

  getAllProducts()
  {
    this.api.getProduct().
                          subscribe
                          ({
                              next:(res)=>{
                                this.dataSource=new MatTableDataSource(res);
                                this.dataSource.paginator=this.paginator;
                                this.dataSource.sort=this.sort;
                              },
                              error:(err)=>{
                                console.log(err);
                              }
                          })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any)
  {
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    })
  }


}

  

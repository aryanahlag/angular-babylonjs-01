import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTable} from "@angular/material/table";

export class config {
  constructor(
    public id: number,
    public userId: string,
    public title: string,
    public body: string
  ) {
  }
}

@Component({
  selector: 'api-test-dialog',
  templateUrl: 'api-test-dialog.component.html'
})

export class ApiTestDialogComponent implements OnInit {
  formValue: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit():void {
    this.formValue = this.formBuilder.group({
      title: '',
      body: '',
      userId: ''
    })
  }

  postDataAPI() {
    this.httpClient.post<any>('https://jsonplaceholder.typicode.com/posts', this.formValue.value, {headers: {'Content-type': 'application/json; charset=UTF-8'}})
      .subscribe(res => {
        console.log('data: ',res)
      }, err => {
        console.log(err)
      })
  }

}

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss']
})

export class ApiTestComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'body', 'userId', 'delete'];

  data: config[];
  @ViewChild(MatTable) table: MatTable<any>

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getDataAPI()
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig()
    const dialogRef = this.dialog.open(ApiTestDialogComponent);

    dialogConfig.autoFocus = true

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getDataAPI() {
    this.httpClient.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(res => {
      console.log("response: ", res)
      this.data = res
    })
  }

  deleteDataAPI(dataElement:any,index:any):void{
    this.httpClient.delete<any>('https://jsonplaceholder.typicode.com/posts/'+dataElement.id)
      .subscribe(res => {
        this.data.splice(index,1)
        this.table.renderRows()
        alert('success delete')
      }, err => {
        console.log(err)
        alert('failed to process')
      })
  }

}

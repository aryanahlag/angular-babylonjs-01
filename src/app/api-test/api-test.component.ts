import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export class config {
  constructor(
    public id: number,
    public userId: string,
    public title: string
  ) {
  }
}

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss']
})
export class ApiTestComponent implements OnInit {

  data: config[];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getDataAPI()
  }

  getDataAPI() {
    this.httpClient.get<any>('https://jsonplaceholder.typicode.com/todos').subscribe(res => {
      console.log("response: ", res)
      this.data = res
    })
  }

}

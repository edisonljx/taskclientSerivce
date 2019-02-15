import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task } from '../task';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };
 
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  URI : string = 'http://localhost:5000/todo/tasks';


  // inject Http module into constructor
  constructor(private http:HttpClient) {
    console.log('Task service initialized ...')
    this.http.get<Task[]>(this.URI).subscribe(data => {
      console.log('tasks from TaskService');
      console.log(data);
      for (let entry of data){
        console.log(entry);
      }
    },
    err => {
      console.log("Error: task.service.ts constructor()")
    });
   }
  getTasks() {
    return this.http.get<Task[]>(this.URI + '/' + 'all');
  }
  getTask(task_id:number) {
    return this.http.get<Task>(this.URI + '/'+ task_id);
  }
  postTask(task) {
    let data = JSON.stringify(task);
    return this.http.post<Task>(this.URI, data, httpOptions);
  }
  putTask(task) {
    let data ={'done':task.done}
    return this.http.put<Task>(this.URI + '/' + task.id,  JSON.stringify(data), httpOptions);
  }
  deleteTask(task_id:number) {
    let deleteUri = this.URI + '/' + task_id;
    return this.http.delete(deleteUri, httpOptions);
  }
}
 


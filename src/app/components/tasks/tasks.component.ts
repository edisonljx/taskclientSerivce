import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../task';
import { Observable, range } from 'rxjs';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {

  // name = 'Eddy';
  // title = 'title';
  public name: string = 'Eddy';
  public title: string;
  public tasks: Task[];

  constructor(private taskService:TaskService) { }

  ngOnInit() {
    console.log('tasks.component.ts ngOnInit()')
    this.getTasks();
    console.log(this.tasks);
  }

  getTasks(){
    this.taskService.getTasks().subscribe(
      // the first argument is a function wich runs on success
      data => { this.tasks = data },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('tasks.component.ts getTasks(): done loading tasks')

    );
  }

  addTask(event){
    event.preventDefault();
    var newTask = {
      title: this.title,
      done: false
    }

    this.taskService.postTask(newTask)
      .subscribe(task =>{
        this.tasks.push(task);
        this.title = '';
      });
  }

  deleteTask(task_id:number) {
    this.taskService.deleteTask(task_id).subscribe(
      data => {
        //TODO
        // this.tasks.filter(x => x.id != task_id);
        this.getTasks();
        return true;
      },
      
      err =>{
      console.error("Error deleing task: " + task_id);
      return Observable.throw(err);
      }
    );
    
  }

  updateTask(task){
    var _task = {
      id:task.id,
      title: task.title,
      done: !task.done
    };
    // use the taskService.putTask() method to update the done field
    // TODO
    this.taskService.putTask(_task).subscribe(
      data => {
        this.tasks[_task['id']].done = _task['done']
        return true;
      },
      err =>{
        console.error("Error updating task: " + task.id)
      }
    )
  }

  

  

}

import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasksListRef : AngularFireList<any>;
  tasksList$ : Observable<any[]>;

  constructor(private db: AngularFireDatabase){
    
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.tasksListRef = this.db.list("/tasks/");

    this.tasksList$ = this.tasksListRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key: c.key,
        value: c.payload.val()
      })))
    );
  }

  addTask(task : HTMLInputElement){
    if(task.value != '')
    {
      let data = task.value;
      task.value = '';
      this.tasksListRef.push(data);
    }
  }

  deleteTask(task){
    this.tasksListRef.remove(task.key);
  }

  deleteAllTask(){
    this.tasksListRef.remove();
  }
}

import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoService } from "src/app/todo.service";
import { Todo } from "../../models/Todo";
import { map } from "rxjs/operators";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  inputTodo: string = "";

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService
      .getData()
      .pipe(
        map((todos: Todo[]) => {
          return todos;
        })
      )
      .subscribe(this.todos);
  }

  toggleDone(id: number) {
    this.todos.value.map((v, i) => {
      if (i == id) v.completed = !v.completed;

      return v;
    });
  }

  addTodo() {
    let todo: Todo = {
      id: this.todos.value.length - 1,
      title: this.inputTodo,
      completed: false,
      userId: 1,
    };
    this.todoService.postData(todo).toPromise().then(
      res => {
        console.log(res);
      }
    ).catch(
      err => {
        console.error(err);
      }
    )
  }
}

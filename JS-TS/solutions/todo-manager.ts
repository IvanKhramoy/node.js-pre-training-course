import {TodoService} from './todo-service';
import {TodoApi} from './todo-api';
import {InMemoryRepository} from './repository';
import {Todo, TodoStatus} from './types';

export class ToDoManager {
  private repo = new InMemoryRepository<Todo>();
  private api = new TodoApi(this.repo);
  private service = new TodoService(this.api);

  async init(): Promise<void> {
    await this.service.create('go to uni', 'listen to 3 lectures');
    await this.service.create('go home');
    await this.service.create('go to gym', 'arms day');
  }

  async add(title: string, description?: string): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    await this.service.setStatus(id, TodoStatus.COMPLETED);
  }

  async list(): Promise<Todo[]> {
    return this.api.getAll();
  }
}

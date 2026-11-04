import {TodoService} from "../JS-TS/solutions/todo-service";
import {TodoApi} from "../JS-TS/solutions/todo-api";
import {Todo, TodoStatus} from "../JS-TS/solutions/types";
import {InMemoryRepository} from "../JS-TS/solutions/repository";
import {resolveObjectURL} from "node:buffer";

describe(('Task 09: Unit Tests'), () => {
  beforeAll(() => {
    jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => {
      cb();
      return 0 as any;
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('TodoService', () => {
    let service: TodoService;

    beforeEach(() => {
      service = new TodoService(new TodoApi());
    });
    it('TodoService should successfully crate a todo with and without description',
      async () => {
        const todoWithDescription = await service.create('go to uni', 'pass 3 labs');
        expect(todoWithDescription.id).toBeDefined();
        expect(todoWithDescription.title).toBe('go to uni');
        expect(todoWithDescription.status).toBe(TodoStatus.PENDING);

        const TodoWithoutDescription = await service.create('go home');
        // ? надо ли первые две строки ниже
        expect(TodoWithoutDescription.id).toBeDefined();
        expect(TodoWithoutDescription.title).toBe('go home');
        expect(TodoWithoutDescription.description).toBeUndefined();
      }
    );
    it('TodoService should reject creation when title is empty or only whitespace',
      async () => {
        await expect(service.create('')).rejects.toThrow();
        await expect(service.create('   ')).rejects.toThrow();
      }
    );
    it('TodoService should toggle status correctly according to the full cycle ' +
      '(PENDING -> IN_PROGRESS => COMPLETED -> PENDING', async () => {
      const item = await  service.create('Status toggling test');
      expect(item.status).toBe(TodoStatus.PENDING);
      // TODO  попробовать вместо ste1, step2.... просто переприсвоить item
      const step1 = await service.toggleStatus(item.id);
      expect(step1.status).toBe(TodoStatus.IN_PROGRESS);
      const step2 = await service.toggleStatus(item.id);
      expect(step2.status).toBe(TodoStatus.COMPLETED);
      const step3 = await service.toggleStatus(item.id);
      expect(step3.status).toBe(TodoStatus.PENDING);
    })

    it('TodoService should throw an error when toggleStatus is called with non-existing ID',
      async () => {
        await expect(service.toggleStatus(9999)).rejects.toThrow();
      }
    );

    it('TodoService should set specific status', async () => {
      const item = await service.create('Changing status test');
      const updated = await service.setStatus(item.id, TodoStatus.COMPLETED);
      expect(updated.status).toBe(TodoStatus.COMPLETED);
    });

    it('TodoService should throw an error when setStatus is called with non-existing id',
      async () => {
        await expect(service.setStatus(-1, TodoStatus.COMPLETED)).rejects.toThrow();
      }
    )

    it('TodoService should search case-insensitively by title and description',
      async () => {
        await service.create('Go to gym', 'arms day');
        await service.create('Read ts handbook', 'generics');

        const byTitle = await service.search('handbook');
        expect(byTitle.length).toBe(1);
        expect(byTitle[0].title).toBe('Read ts handbook');

        const byDescription = await service.search('day');
        expect(byDescription.length).toBe(1);
        expect(byDescription[0].description).toBe('arms day');

        const noMatch = await service.search('non-existing');
        expect(noMatch).toEqual([]);
      }
    );

  });

  describe('InMemoryRepository', () => {
    let repo: InMemoryRepository<{ id: number; name: string }>;
    beforeEach(() => {
      repo = new InMemoryRepository<{id: number; name: string}>();
    });
    it('should add items and retrieve all', () => {
      repo.add({id: 1, name: 'first'});
      repo.add({id: 2, name: 'second'});

      expect(repo.findAll()).toEqual([
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
      ])
    })

    it('should find item by id or return undefined if absent', () => {
      repo.add({id: 1, name: 'First'});
      expect(repo.findById(1)).toEqual({id: 1, name: 'First'});
      expect(repo.findById(999)).toBeUndefined();
    });

    it('should update existing item and throw on non-existing', () => {
      repo.add({ id: 1, name: 'old'});
      const updated = repo.update(1, {name: 'new'});

      expect(updated.name).toBe('new');
      expect(repo.findById(1)?.name).toBe('new');
      expect(() => repo.update(999, {name: 'fail'})).toThrow();
    });

    it('should remove existing item and throw on non-existing', () => {
      repo.add({id: 1, name: 'Item'});
      repo.remove(1);

      expect(repo.findById(1)).toBeUndefined();
      expect(repo.findAll().length).toBe(0);

      expect(() => repo.remove(999)).toThrow();
    });
  });
});
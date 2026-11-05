#!/usr/bin/env ts-node

import {ToDoManager} from "./todo-manager";

async function main() {
  const manager = new ToDoManager();
  await manager.init();

  const [, , command, ...args] = process.argv;

  switch (command) {
    case 'add':
      await manager.add(args[0], args[1]);
      console.log(`Added todo: ${args[0]}`);
      break;
    case 'complete':
      await manager.complete(+(args[0]));
      console.log(`Completed todo: ${args[0]}`);
      break;
    case 'list':
    default:
      const todos = await manager.list();
      console.table(todos);
      break;
  }
}

main().catch(console.error);
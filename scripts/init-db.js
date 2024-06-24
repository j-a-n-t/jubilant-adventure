let database = db.getSiblingDB('task');

database.createUser({
  user: 'mongo-task',
  pwd: '1uyZewMf6jMRgJuGBR6N',
  roles: [
    {
      role: 'readWrite',
      db: 'task',
    },
  ],
});

# API Kit Yeoman Generator

This generator provides a convenient way to get up and running APIs using Mongoose and Mystique in no time.

## Installation

Api Kit relies on Yeoman to run it's generator code and get things moving quickly.
To install Yeoman and API Kit, run:

```shell
npm install -g yo generator-api-kit
```

## Generating An API Kit Project

To start, we need an API Kit Project:

```shell
yo api-kit
```

This will ask for an app name and whether the project should be in a new folder.
Then, it will npm install all dependencies.

From there, change directories into the new project an run `npm start` to start running the API server.

## Generating An API Resource

Building an api can be tough, luckily with API Kit, an API resource can be created with a single command:

```shell
yo api-kit:resource todo name:String:required done:Boolean completedAt:Date
```

This will create three files:

```js
// app/models/todo.js
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodoSchema = new Schema({
  name: {type: String, required: true},
  completedAt: {type: Boolean},
  done: {type: Date},
});

module.exports = Mongoose.model('Todo', TodoSchema);
```

```js
// app/transformers/todo.js
var Mystique = require('mystique');

var TodoTransformer = Mystique.Transformer.extend({
  resourceName: 'todo',
  mapOut: function(todo) {
    return {
      id: todo.id,
      name: todo.name,
      done: todo.done,
      completedAt: todo.completedAt,
    };
  },

  mapIn(req) {
    return {
      name: req.body.todo.name,
      done: req.body.todo.done,
      completedAt: req.body.todo.completedAt,
    };
  },
});

Mystique.registerTransformer('Todo', TodoTransformer);
```

```js
// app/http/resources/todos.js
var express = require('express');
var router = express.Router();

router.get('/', function(req) {
  return req.store.recordCollection('Todo');
});

router.get('/:id', function(req) {
  return req.store.recordItemById('Todo', req.params.id);
});

router.post('/', function(req) {
  return req.store.createRecord('Todo');
});

router.put('/:id', function(req) {
  return req.store.updateRecord('Todo', {}, req.params.id);
});

router.delete('/:id', function(req) {
  return req.store.destroyRecord('Todo', req.params.id);
});

module.exports = router;
```

This command also registers the route in `app/http/routes.js`:

```js
apiRouter.use('/todos', resources.todos);
```

> With API Kit v1.x we still have to register our new resource with the router in `app/http/routes.js` add `apiRouter.use(resources.todos);`

> With API Kit v1.x we still have to register our new model in `app/models/index.js` add `Todo: models.todo,`

> With API Kit v1.x we still have to register our new transformer in `app/transformers/index.js` add `Todo: require('./todo'),``


Now we can go to `http://localhost:3000/api/todos` to see our new API for todos:

```json
{
  "todos": []
}
```

If we POST to `http://localhost:3000/api/todos` with the body:

```json
{
  "todo": {
    "name": "Milk",
    "done": false
  }
}
```

Then we should get a response with an id:

```json
{
  "todo": {
    "id": "5671cffe881ee28a7877118c",
    "name": "Milk",
    "done": false
  }
}
```

And if we make a GET request for `http://localhost:3000/api/todos`:

```json
{
  "todos": [
    {
      "id": "5671cffe881ee28a7877118c",
      "name": "Milk",
      "done": false
    }
  ]
}
```

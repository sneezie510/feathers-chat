'use strict';
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;
  const options = {
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Connect to your MongoDB instance(s)
  MongoClient.connect('mongodb://localhost:27017/feathers')
    .then(function (client) {
      // Set the model now that we are connected
      app.service('messages').Model = client.db('feathers').collection('messages');
    }).catch(error => console.error(error));

  // Initialize our service with any options it requires
  app.use('/messages', service(options));

  // Get our initialize service to that we can bind hooks
  const messageService = app.service('/messages');

  // Set up our before hooks
  messageService.before(hooks.before);

  // Set up our after hooks
  messageService.after(hooks.after);
};

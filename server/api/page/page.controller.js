/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pages              ->  index
 * POST    /api/pages              ->  create
 * GET     /api/pages/:id          ->  show
 * PUT     /api/pages/:id          ->  update
 * DELETE  /api/pages/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Page from './page.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Pages
export function index(req, res) {
  return Page.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));

}

// Gets a single Page from the DB
export function show(req, res) {
  return Page.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Page in the DB
export function create(req, res) {
  return Page.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Page in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Page.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Page from the DB
export function destroy(req, res) {
  return Page.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

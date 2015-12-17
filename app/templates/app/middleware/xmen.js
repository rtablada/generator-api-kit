var Mongoose = require('mongoose');
var Mystique = require('mystique');
var _ = require('lodash');
var url = require('url');
var dot = require('dot-object');

var defaultBeforeSave = (model, save) => {
  save();
};

module.exports = function(req, res, next) {
  req.getJson = function(key, def) {
    return dot.pick(key, req.body) || def;
  };

  req.store = {
    renderCollection(collection, modelName, options) {
      var Transformer = Mystique.getTransformer(modelName);
      var output = Transformer.collection(collection, Transformer.mapOut);

      res.send(output);
    },

    renderItem(model, modelName, options) {
      var Transformer = Mystique.getTransformer(modelName);
      var output = Transformer.item(model, Transformer.mapOut);

      res.send(output);
    },

    // req.store.recordCollection('Book', {indlude: ['author'], queryBy: ['year'], orderBy: 'year'});
    recordCollection(modelName, options) {
      options = options || {};
      options.include = options.include || [];
      var Model = Mongoose.model(modelName);

      var urlParts = url.parse(req.url, true);

      var searchvValues = _.pick(urlParts.query, options.queryBy);

      if (urlParts.ids) {
        searchvValues._id = urlParts.ids;
      }

      var query = Model.find(searchvValues)
        .sort(urlParts.query.orderBy || options.orderBy)
        .populate(options.include)
        .exec((err, results) => {
          if (err) {
            return res.status(500).send(err);
          }

          req.store.renderCollection(results, modelName, options);
        });
    },

    createRecord(modelName, options) {
      options = options || {};
      options.include = options.include || [];
      var beforeSave = options.beforeSave || defaultBeforeSave;
      var afterSave = options.afterSave || () => {};

      var Transformer = Mystique.getTransformer(modelName);

      var data = Transformer.rawItem(req, Transformer.mapIn);
      var Model = Mongoose.model(modelName);

      var model = new Model(data);
      beforeSave(model, () => {
        model.save((err) => {
          if (err) {
            return res.status(500).send(err);
          }

          model.populate(options.include, () => {
            req.store.renderItem(model, modelName, options);

            afterSave(model);
          });
        });
      });
    },

    recordItemById(modelName, id, options) {
      options = options || {};
      options.include = options.include || [];
      var Model = Mongoose.model(modelName);

      Model.findById(id)
        .populate([])
        .exec((err, model) => {
          if (err) {
            return res.status(500).send(err);
          }

          req.store.renderItem(model, modelName, options);
        });
    },

    updateRecord(modelName, id, options) {
      options = options || {};
      options.include = options.include || [];
      var beforeSave = options.beforeSave || defaultBeforeSave;
      var afterSave = options.afterSave || () => {};

      var Transformer = Mystique.getTransformer(modelName);

      var data = Transformer.rawItem(req, Transformer.mapIn);
      var Model = Mongoose.model(modelName);

      Model.findById(id)
        .populate([])
        .exec((err, model) => {
          beforeSave(model, () => {
            if (err) {
              return res.status(500).send(err);
            }

            model.set(data);
            model.save((err) => {
              if (err) {
                return res.status(500).send(err);
              }

              req.store.renderItem(model, modelName, options);

              afterSave(model);
            });
          });
        });
    },

    destroyRecord(modelName, id) {
      var Model = Mongoose.model(modelName);

      Model.remove({_id: id})
        .exec((err, model) => {
          if (err) {
            return res.status(500).send(err);
          }

          req.status(204).send();
        });
    },
  };

  return next();
};

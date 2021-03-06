const express = require('express');
const ensure = require('connect-ensure-login');
const ensureLoggedInApiVersion = require('../lib/ensure-logged-in-api');
const router = express.Router();
const path = require('path');
const ShoppingItem = require('../models/shopping-list.js');
const UserModel = require('../models/user-model.js')

router.get('/api/cart',
    ensureLoggedInApiVersion,
    (req, res, next) => {
        // use mongoose to get all things in the database
        ShoppingItem.find((err, shoppingItems) => {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                next(err);
                return;
            }
            res.json(shoppingItems); //return all things in the cart in JSON
        });
    });

router.post('/api/cart',
    ensureLoggedInApiVersion,
    function(req, res, next) {
        // create a new entry in the shoppingList, information comes from Angular Ajax
        ShoppingItem.create({
            name: req.body.productName,
            quantity: req.body.productQuantity,
            bought: false
        }, function(err, shoppingItem) {
            if (err)
                res.send(err);

            //get and return all the items in the ShoppingList after creation of another item
            ShoppingItem.find(function(err, shoppingItems) {
                if (err)
                    res.send(err)
                res.json(shoppingItems);
            });
        });
    });

router.delete('/api/cart/:shoppingitem_id',
    function(req, res) {
        ShoppingItem.remove({
            _id: req.params.shoppingitem_id
        }, function(err, shoppingItem) {
            if (err)
                res.send(err);

            ShoppingItem.find(function(err, items) {
                if (err)
                    res.send(err)
                res.json(items);
            })
        });
    });

module.exports = router;
'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

// router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', controller.show);
router.post('/', controller.create);

router.get('/:id/profileImg', auth.isAuthenticated(), controller.profileImg);
router.post('/:id/addFollower', auth.isAuthenticated(), controller.addFollower);
router.post('/:id/removeFollower', auth.isAuthenticated(), controller.removeFollower);
module.exports = router;

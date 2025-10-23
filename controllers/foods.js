const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Index route – prikaz svih stavki iz korisnikovog pantry-ja
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const pantry = user.pantry;
    res.render('foods/index.ejs', { pantry });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});


// INDEX route - prikazuje sve food iteme za trenutnog korisnika
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', { pantry: user.pantry });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// NEW route - prikazuje formu za dodavanje novog food itema
router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});



// CREATE route - dodaje novi food item u pantry
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body); // req.body = { name: 'ime hrane' }
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// DELETE route - briše food item iz pantry
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id); // filtriramo pantry da izbacimo stavku po id-u
    user.pantry.id(req.params.itemId).remove(); // Mongoose metoda za embedded document
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// EDIT route - prikazuje formu za edit food itema
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { item });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// UPDATE route - ažurira food item
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);
    item.set(req.body); // ažurira sa novim podacima iz forme
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});


module.exports = router;

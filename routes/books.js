const router = require('express').Router();
const bookController = require('../controllers/BookContoller')


router.route('/')
    .get(bookController.getBookList)
    .post(bookController.addBook)
    .put(bookController.updateBook)
    .delete(bookController.removeBook)

router.route('/:id')
    .get(bookController.getBook)

module.exports = router
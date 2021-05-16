import express from 'express'

export const router = express.Router()

import * as book from '../controllers/book/export.js'
import * as store from '../controllers/store/export.js'
import * as store_book from '../controllers/store_book/export.js'

//Book routes
router.post(
  '/book/create',
  book.c.createBook
)
router.delete(
  '/book/delete',
  book.d.deleteBook
)

//Store routes 
router.post(
  '/store/create',
  store.c.createStore
)
router.delete(
  '/store/delete',
  store.d.deleteStore
)

//Store_book routes 
router.post(
  '/store_book/create',
  store_book.c.createStoreBook
)

router.delete(
  '/store_book/delete',
  store_book.d.deleteStoreBook
)

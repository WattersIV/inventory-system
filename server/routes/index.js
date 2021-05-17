import express from 'express'

export const router = express.Router()

import * as book from '../controllers/book/export.js'
import * as store from '../controllers/store/export.js'
import * as store_book from '../controllers/store_book/export.js'
import * as user from '../controllers/user/export.js'

//User routes
router.get(
  '/user/login',
  user.r.login
)

//Book routes
router.get(
  '/book/get/id',
  book.r.getBookbyId
)
router.post(
  '/book/create',
  book.c.createBook
)
router.delete(
  '/book/delete',
  book.d.deleteBook
)
router.put(
  '/book/update',
  book.u.updateBook
)

//Store routes 
router.get(
  '/store/get/id',
  store.r.getStorebyId
)
router.post(
  '/store/create',
  store.c.createStore
)
router.delete(
  '/store/delete',
  store.d.deleteStore
)
router.put(
  '/store/update',
  store.u.updateStore
)

//Store_book routes 
router.get(
  '/store_book/get/id',
  store_book.r.getStoreBookbyId
)
router.get(
  '/store_book/get/inventory',
  store_book.r.getStoreBookInventory
)
router.get(
  '/store_book/get/books',
  store_book.r.getBooksInStore
)
router.post(
  '/store_book/create',
  store_book.c.createStoreBook
)
router.delete(
  '/store_book/delete',
  store_book.d.deleteStoreBook
)
router.put(
  '/store_book/update',
  store_book.u.updateStoreBook
)

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
router.post(
  '/user/signup',
  user.r.checkIfUserExists,
  user.c.createNewUser
)


//Book routes
router.get(
  '/book/get/id',
  user.r.verifyAccessToken,
  book.r.getBookbyId
)
router.post(
  '/book/create',
  user.r.verifyAccessToken,
  book.c.createBook
)
router.delete(
  '/book/delete',
  user.r.verifyAccessToken,
  book.d.deleteBook
)
router.put(
  '/book/update',
  user.r.verifyAccessToken,
  book.u.updateBook
)

//Store routes 
router.get(
  '/store/get/id',
  user.r.verifyAccessToken,
  store.r.getStorebyId
)
router.post(
  '/store/create',
  user.r.verifyAccessToken,
  store.c.createStore
)
router.delete(
  '/store/delete',
  user.r.verifyAccessToken,
  store.d.deleteStore
)
router.put(
  '/store/update',
  user.r.verifyAccessToken,
  store.u.updateStore
)

//Store_book routes 
router.get(
  '/store_book/get/id',
  user.r.verifyAccessToken,
  store_book.r.getStoreBookbyId
)
router.get(
  '/store_book/get/inventory',
  user.r.verifyAccessToken,
  store_book.r.getStoreBookInventory
)
router.get(
  '/store_book/get/books',
  user.r.verifyAccessToken,
  store_book.r.getBooksInStore
)
router.post(
  '/store_book/create',
  user.r.verifyAccessToken,
  store_book.c.createStoreBook
)
router.delete(
  '/store_book/delete',
  user.r.verifyAccessToken,
  store_book.d.deleteStoreBook
)
router.put(
  '/store_book/update',
  user.r.verifyAccessToken,
  store_book.u.updateStoreBook
)

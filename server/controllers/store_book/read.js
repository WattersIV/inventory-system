import { db } from '../../db/db.js'

export const getStoreBookbyId = async (
  req,
  res,
  next
) => {
  console.log('get store_book by id')
  const { id } = req.body
  // If no id return 400 promt user to fill it in 
  if (!id) res.status(400).json({ message: 'Missing store_book id' })

  try {
    const response = await db('store_book')
      .where({ id })
      .select('*')

    if (!response.length) return res.status(404).json({ message: 'Store book realtion does not exist' })
    res.status(200).json({ data: response })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const getStoreBookInventory = async (
  req,
  res,
  next
) => {
  //Front end will call this function every min to get an update on all the books quantity. 
  //The use case is for when a user is staying on a page with the stock of books present for over a min.
  console.log('update book inventory')
  const { storeId } = req.body
  //If no id send 400 and ask user for fields
  if (!storeId) res.status(400).json({ message: 'Missing store id' })

  try {
    const response = await db('store_book')
      .where({
        store_id: storeId
      })
      .select('id', 'quantity')
    res.status(200).json({ data: response })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const getBooksInStore = async (
  req,
  res,
  next
) => {
  //Paginated api call to reduce load size
  console.log('get books in store')
  //If no page argument will query limit in one page
  const { page = 1, limit, storeId } = req.body
  //If missing storeId send 400 and ask user for them 
  if (!storeId) res.status(400).json({ message: 'Missing store id' })

  const startIndex = (page - 1) * limit

  try {
    const response = await db('store_book')
    .where({
      store_id: storeId
    })
    .limit(limit)
    .offset(startIndex)
    .rightJoin('book', 'store_book.book_id', 'book.id')
    .select('book.id', 'book.name', 'book.author', 'store_book.quantity')
    if (!response.length) return res.status(404).json({ message: 'There are no more books at this store' })
    res.status(200).json({ data: response })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
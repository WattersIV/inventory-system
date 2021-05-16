import { db } from '../../db/db.js' 

export const createStoreBook = async (
  req,
  res,
  next
) => {
  console.log('create store_book')
  const { bookId, storeId, quantity } = req.body
  // If missing values return 400 promt user to fill it in 
  if (!bookId || !storeId || !quantity ) res.status(400).json({ message: 'Missing details'})

  try {
    const [id] = await db('store_book')
      .insert({
        quantity,
        book_id: bookId,
        store_id: storeId
      }) 
      .returning('id');
    res.status(201).json({ id: id })
  } catch(err) {
    res.status(500).json({ message: err })
  }
}
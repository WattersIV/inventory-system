import { db } from '../../db/db.js'

export const deleteStoreBook = async (
  req,
  res,
  next
) => {
  console.log('delete store_book')
  const { id } = req.body
  if (!id)  res.status(400).json({ message: 'Missing store_book id'})
  try {
    await db("store_book")
      .where({ id })
      .delete()
    res.status(200).json({ message: 'Store and book relation deleted' })
  } catch (err) {
    if (err.code === '42P01') return res.status(404).json({ message: 'Store and book relation does not exist' })
    res.status(500).json({ message: err })
  }
};
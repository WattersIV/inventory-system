import { db } from '../../db/db.js'

export const deleteBook = async (
  req,
  res,
  next
) => {
  console.log('delete book')
  const { id } = req.body
  if (!id)  res.status(400).json({ message: 'Missing book id'})
  try {
    await db("book")
      .where({ id })
      .delete()
    res.status(200).json({ message: 'Book deleted' })
  } catch (err) {
    if (err.code === '42P01') return res.status(404).json({ message: 'Book does not exist' })
    res.status(500).json({ message: err })
  }
};
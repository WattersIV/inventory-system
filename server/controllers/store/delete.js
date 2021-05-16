import { db } from '../../db/db.js'

export const deleteStore = async (
  req,
  res,
  next
) => {
  console.log('delete store')
  const { id } = req.body
  if (!id)  res.status(400).json({ message: 'Missing store id'})
  try {
    await db("store")
      .where({ id })
      .delete()
    res.status(200).json({ message: 'Store deleted' })
  } catch (err) {
    if (err.code === '42P01') return res.status(404).json({ message: 'Store does not exist' })
    res.status(500).json({ message: err })
  }
};
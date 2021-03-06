import { db } from '../../db/db.js' 

export const updateStoreBook = async (
  req,
  res,
  next
) => {
  console.log('update store_book') 
  const { field, value, id } = req.body
  //If no field value or id send 400 and ask user for fields
  if (!field || !value || !id) res.status(400).json({ message: 'Missing fields' })
  //Need to send field in snake case. If it may not come in snake case add a function to transform it
  try {
    await db('store_book')
    .where({ id })
    .update({
      [field]: value
    })
    .returning('id')
    res.status(200).json({ message: 'Store and book relationship updated successfully' })
  } catch (err) {
    if (err.code === '42P01') return res.status(404).json({ message: 'Store and book relationship does not exist' })
    if (err.code === '42703') return res.status(404).json({ message: 'Invalid field name' })    
    res.status(500).json({ message: err })
  }
}
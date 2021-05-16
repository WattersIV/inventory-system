import { db } from '../../db/db.js' 

export const getStorebyId = async (
  req,
  res,
  next
) => {
  console.log('get store by id')
  const { id } = req.body
  // If no id return 400 promt user to fill it in 
  if (!id) res.status(400).json({ message: 'Missing store id'})

  try {
    const response = await db('store')
      .where({ id })
      .returning('*')

    if (!response.length) return res.status(404).json({ message: 'Store does not exist' })
    res.status(200).json({ data: response })
  } catch(err) {
    res.status(500).json({ message: err })
  }
}
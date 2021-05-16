import { db } from '../../db/db.js' 

export const createStore = async (
  req,
  res,
  next
) => {
  console.log('create store')
  const { name } = req.body
  // If no name return 400 promt user to fill it in 
  if (!name ) res.status(400).json({ message: 'Missing name'})

  try {
    const [id] = await db('store')
      .insert({
        name,
      }) 
      .returning('id');
    res.status(201).json({ id: id })
  } catch(err) {
    res.status(500).json({ message: err })
  }
}
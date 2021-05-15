import { db } from '../../db/db.js' 

export const createBook = async (
  req,
  res,
  next
) => {
  console.log('create book')
  const { name, author } = req.body
  // If no title or author return 400 promt user to fill it in 
  if (!name || !author ) return res.status(400).json({ message: 'Missing title or author'})

  try {
    const [id] = await db('book')
      .insert({
        name,
        author,
      })
      .returning('id');
    res.status(201).json({ id: id })
  } catch(err) {
    res.status(500).json({ message: err })
  }
}
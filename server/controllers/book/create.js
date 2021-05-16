import { db } from '../../db/db.js' 

export const createBook = async (
  req,
  res,
  next
) => {
  //Unique index of author and name not working it shouldnt allow multiple books with same author and name to be inserted
  console.log('create book')
  const { name, author } = req.body
  // If no name or author return 400 promt user to fill it in 
  if (!name || !author ) res.status(400).json({ message: 'Missing title or author'})

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
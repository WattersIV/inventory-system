import { db } from '../../db/db.js'

export const updateLastLogin = async (id) => {
  await db('user')
  .where({ id })
  .update({ 
    last_login: Date.now()
  })
  return
}
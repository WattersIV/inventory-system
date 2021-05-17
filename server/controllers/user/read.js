import { db } from '../../db/db.js' 
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import { createAccessToken } from './create.js'

export const login = async (
  req,
  res,
  next
) => {
  console.log('login')
  const { username, rawPassword } = req.body
  //If missing creditentials send 400 and promt user
  if ( !username || !rawPassword ) return res.staus(400).json({ message: 'Missing username or password' })

  try {
    //Checking if username exists and grabbing password
    const [password] = await db('user')
      .select('password')
      .where({
        username
      }) 
    //Check if password matches one found for that user
    try {
      await verifyPassword(rawPassword, password)
      
      //create an access token and send it to user if pass matches
      const user = { 
        name : username, 
        password,
      }
      const accessToken = createAccessToken(user)
      res.status(200).json({ accessToken })
    } catch (err) {
      //Invalid password
      res.status(401).json({ message: 'Invalid Credientals' })
    }
  } catch (err) {
    res.send(500).json({ message: err})
  }
}

export const verifyAccessToken = async (
  req,
  res,
  next
) => {
  console.log('authenticating token')
  const authHeader = req.headers['authorization']
  //If no header make token null
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return sendStatus(401)
  
  //Change to env var
  jwt.verify(token, 'secret', (err, user) => {
    //Invalid token
    if (err) return res.sendStatus(403)
    //valid token
    req.user = user
    next()
  })
}

export const verifyPassword = (rawPassword, hashedPassword) => {
  console.log("verify password");
  return new Promise(function (resolve, reject) {
    const splited = hashedPassword.split(":");
    const dbSalt = Buffer.from(splited[0], "hex");
    const dbPassword = splited[1];
    const hashedInputPassword = crypto
      .scryptSync(rawPassword, dbSalt, 64)
      .toString("hex");
    if (hashedInputPassword === dbPassword) {
      resolve("success");
    } else {
      reject("Incorrect password");
    }
  });
}

export const hashPassword = (rawPassword) => {
  console.log("hash password");
  return new Promise(function (resolve, reject) {
    const salt = Buffer.from(
      Array(32)
        .fill(0)
        .map(() => Math.random() * 128)
    );
    crypto.scrypt(rawPassword, salt, 64, (err, derivedKey) => {
      if (err) {
        throw err;
      } else {
        resolve(salt.toString("hex") + ":" + derivedKey.toString("hex"));
      }
    });
  });
}



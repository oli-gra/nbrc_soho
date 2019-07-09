// service logic for routes
import nbrc from '../services/nbrc.mjs'
import { getUser, postUser, postRating } from './queries.mjs'

// express router
import express from 'express'
const route = express.Router()

route.post('/users', async (req, res) => {
   const email = req.query.email
   try {
      await postUser(email)
         .then(data => res.status(200).send(data.rows[0]))
   } catch {
      res.status(500).send('Unable to add user, try later')
   }
})

route.get('/datasets', async (req, res) => {
   try {
      await nbrc.then(datasets => {
         res.status(200).send(datasets)
      })
   } catch {
      res.status(500).send('Server is not responding, try later')
   }
})

route.post('/datasets/:id/rating', async (req, resp) => {
   // dataset id from url, user email and rating from html header queries
   const did = req.params.id
   const email = req.query.email
   const rating = parseInt(req.query.rating)

   try {
      // get user id for email
      await getUser(email)
         // post users rating
         .then(user => {
            const uid = Object.values(user.rows[0])[0]
            return postRating(uid, did, rating)
               .then(data => {
                  const rating = JSON.stringify(data.rows[0].rating)
                  resp.status(200).send(rating)
               })
         })
   } catch {
      resp.status(404).send('Cannot rate dataset')
   }
})

route.get('/datasets/top', async (req, res) => {
   try {
      await res.send(`${req === 'all' ? 'all' : 'recently'}`)
   } catch {
      res.status(500).send('Server is not responding, try later')
   }
})

export default route
// service logic for routes
import nbrc from '../services/nbrc.mjs'
import getUser from './queries.mjs'

// express router
import express from 'express'
import { postRating } from './queries.mjs';
const route = express.Router()

route.get('/datasets', async (req, res) => {
   try {
      await nbrc.then(data => res.status(200).send(data))
   } catch {
      res.status(500).send('Server is not responding, try later')
   }
})

route.post('/datasets/:id/rating', async (req, resp) => {
   // dataset id from url, user email and rating from html header queries
   const id = parseInt(req.params.id)
   const email = req.query.email
   const rating = parseInt(req.query.rating)

   try {
      await getUser(email)
         .then(user => postRating(id, user[0].id, rating)
            .then(rating => resp.status(200)
               .send(rating))
         )
   } catch {
      res.status(404).send('Cannot rate dataset')
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
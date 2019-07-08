import { Router } from 'express'
const route = Router()


route.get('datasets', async (req, res) => {
   const rdy = await res.send('this is a test')
   return rdy
})

export default route
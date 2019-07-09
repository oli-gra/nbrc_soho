import sh from 'ship-hold'

const db = sh.shiphold({
   user: 'oli-gra',
   host: 'localhost',
   database: 'api',
   password: '',
   port: 5432,
})

export default async function getUser(email) {
   return db.select()
      .from('users')
      .where('email', '=', email)
      .run()
}

export async function postRating(did, uid, rating) {
   db.insert('id', 'rating', 'uid', 'did')
      .values({
         rating: rating,
         uid: uid,
         did: did
      })
      .into('ratings')
      .returning('*')
      .build()
}
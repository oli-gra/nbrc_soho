import pg from 'pg'

const db = new pg.Pool({
   user: 'oli-gra',
   host: 'localhost',
   database: 'api',
   password: '',
   port: 5432,
})

export async function getUser(email) {
   return db.query(
      'SELECT 1 FROM users WHERE email = $1', [email]
   )
}

export async function postUser(email) {
   return db.query(
      'INSERT INTO users VALUES (DEFAULT,$1) ON CONFLICT ON CONSTRAINT unique_email DO NOTHING', [email]
   )
}

export async function getRatings() {
   return db.query(
      'SELECT * FROM ratings ORDER BY rating DESC'
   )

}

export async function postRating(uid, did, rating) {
   return db.query(
      'INSERT INTO ratings VALUES (DEFAULT,$1,$2,$3) RETURNING rating', [uid, did, rating]
   )
}

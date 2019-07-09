import axios from 'axios'
import { getRatings } from '../api/queries.mjs'
// HTML parser to GET NBRC datasets info

const nbrc = axios
   .get('https://ckan.publishing.service.gov.uk/api/action/package_search?fq=organization:northamptonshire-biodiversity-records-centre')
   .then(async function (res) {
      const ratings = await getRatings()
      const summary = await res.data.result.results.map(dataset => {
         return ({
            id: dataset.id,
            title: dataset.title,
            notes: dataset.notes,
            ratings: ratings.rows,
            resources: dataset.resources.map(resource => {
               return ({
                  description: resource.description,
                  format: resource.format,
                  url: resource.url
               })
            })
         })

      }
      )
      console.log(ratings)
      return summary
   })

// return results array to controller

export default nbrc
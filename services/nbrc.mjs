import axios from 'axios'
// HTML parser to GET NBRC datasets info

const nbrc = axios
   .get('https://ckan.publishing.service.gov.uk/api/action/package_search?fq=organization:northamptonshire-biodiversity-records-centre')
   .then(res => res.data.result.results)
// return results array to controller

export default nbrc
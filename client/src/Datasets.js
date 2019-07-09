import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex',
   },
   formControl: {
      margin: theme.spacing(3),
   },
   group: {
      margin: theme.spacing(1, 0),
   },
}));

export default function Datasets() {
   const classes = useStyles();
   const [value, setValue] = React.useState('');
   const [datasets, setDatasets] = React.useState('[]')

   React.useEffect(() => {
      async function getDatasets() {
         const res = await axios.get('http://localhost:3000/datasets/')
         setDatasets(res.data)
      }
      getDatasets()
   }, [])

   function handleChange(event) {
      setValue(event.target.value);
   }

   return (
      <div className={classes.root}>
         <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
               aria-label="datasets"
               name="datasets"
               className={classes.group}
               value={value}
               onChange={handleChange}
            >
               {/* Map logic for radio buttons to select a dataset */}
               <FormControlLabel
                  value="dataset"
                  control={<Radio />}
                  label="dataset" />

            </RadioGroup>
         </FormControl>
      </div>
   );
}
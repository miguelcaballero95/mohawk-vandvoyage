import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getCities } from '../../data';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const cities = getCities();

const DestinationSelect = ({ control }) => {

  const [open, setOpen] = useState(false);

  return (
    <Controller
      name="destination"
      control={control}
      defaultValue={null}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={cities}
          sx={{ width: 300 }}
          value={cities.find(city => city.id === value) || null}
          onChange={(event, newValue) => {
            onChange(newValue ? newValue.id : null);
          }}
          open={open}
          onOpen={() => {
            if (value) setOpen(true);
          }}
          onClose={() => setOpen(false)}
          onInputChange={(event, newInputValue) => {
            if (newInputValue.length > 0) {
              setOpen(true);
            } else {
              setOpen(false);
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Where to?" />
          )}
        />
      )}
    />
  );
}

export default DestinationSelect;
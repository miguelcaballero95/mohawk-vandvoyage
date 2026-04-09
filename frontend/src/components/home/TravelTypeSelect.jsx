import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getTravelTypes } from "../../data"
import { Controller } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';

const travelTypes = getTravelTypes();

const TravelTypeSelect = ({ control }) => {
  // Use translation function so labels display in the active language
  const { t } = useLanguage();

  return (
    <Controller
      name="type"
      control={control}
      rules={{ required: "Field is required" }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          disablePortal
          options={travelTypes}
          sx={{ width: 300 }}
          openOnFocus
          onChange={(_, newValue) => {
            onChange(newValue ? newValue.id : "");
          }}
          // Show translated label in the dropdown
          getOptionLabel={(option) => t(option.id) || option.label || ""}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          value={travelTypes.find((opt) => opt.id === value) || null}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('whatLookingFor')}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  )
}

export default TravelTypeSelect

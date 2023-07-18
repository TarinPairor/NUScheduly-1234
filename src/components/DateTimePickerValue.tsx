import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface DatePickerValueProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
}

export default function DateTimePickerValue({
  value,
  onChange,
}: DatePickerValueProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Choose time"
        value={value || undefined} // Pass undefined instead of null
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DatePickerValueProps {
  value?: Date | null;
  onChange?: (newValue: Date | null) => void;
}

function DatePickerValue({ value, onChange }: DatePickerValueProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={onChange} />
    </LocalizationProvider>
  );
}

export default DatePickerValue;

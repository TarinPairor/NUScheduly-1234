import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// Interface to define the props for the DateTimePickerValue component
interface DatePickerValueProps {
  // The selected date value
  value: Date | null;
  // Callback function to handle the date value change
  onChange: (newValue: Date | null) => void;
}

// DateTimePickerValue component is a functional component that wraps the DateTimePicker component
const DateTimePickerValue: React.FC<DatePickerValueProps> = ({
  value,
  onChange,
}) => {
  return (
    // It provides the necessary localization for date and time pickers
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* The DateTimePicker component from MUI's x-date-pickers library */}
      <DateTimePicker
        label="Choose time" // Label to display above the DateTimePicker
        value={value || undefined} // Pass undefined instead of null to the DateTimePicker
        onChange={onChange} // Callback function to handle date and time selection changes
      />
    </LocalizationProvider>
  );
};

// Export the DateTimePickerValue component for use in other parts of the application
export default DateTimePickerValue;

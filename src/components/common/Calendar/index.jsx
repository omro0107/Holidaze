import React from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

const Calendar = ({
  selected,
  onSelect,
  disabled,
  minDate,
  maxDate,
  disabledDates = [],
  numberOfMonths = 1,
  mode = 'single',
  className = '',
}) => {
  const defaultStyles = {
    root: 'calendar-root',
    caption: 'flex justify-center items-center py-2 mb-4',
    caption_label: 'text-sm font-medium text-gray-900',
    nav: 'flex items-center',
    nav_button: 
      'inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100',
    nav_button_previous: 'mr-1',
    nav_button_next: 'ml-1',
    table: 'w-full border-collapse',
    head_row: 'flex',
    head_cell: 
      'text-gray-500 font-normal text-center text-sm w-9 h-9 flex-1',
    row: 'flex w-full mt-2',
    cell: 'relative p-0 text-center text-sm focus-within:relative w-9 h-9 flex-1',
    day: 
      'inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 transition-colors',
    day_selected: 
      '!bg-primary-600 text-white hover:bg-primary-700',
    day_today: 
      'text-primary-600 font-semibold',
    day_disabled: 
      'text-red-300 bg-red-50 hover:bg-red-50 cursor-not-allowed line-through',
    day_range_middle: 
      'rounded-none bg-gray-100',
    day_hidden: 
      'invisible',
  };

  const formatCaption = (date) => {
    return format(date, 'MMMM yyyy');
  };

  // Add custom CSS for the calendar
  const calendarStyles = `
    .calendar-root .rdp-day_disabled:not(.rdp-day_selected) {
      background-color: #FEE2E2;
      opacity: 0.8;
      text-decoration: line-through;
    }
    .calendar-root .rdp-day_disabled:hover {
      background-color: #FEE2E2 !important;
      cursor: not-allowed;
    }
    .calendar-root .rdp-day_selected {
      background-color: #2563EB;
      color: white;
    }
    .calendar-root .rdp-day_range_middle {
      background-color: #DBEAFE;
      border-radius: 0;
    }
  `;

  return (
    <div className={`p-4 bg-white rounded-lg shadow ${className}`}>
      <style>{calendarStyles}</style>
      <DayPicker
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        disabled={[
          ...disabledDates,
          {
            before: minDate || undefined,
            after: maxDate || undefined,
          },
          ...(disabled ? [{ from: new Date(0), to: new Date(8640000000000000) }] : []),
        ]}
        numberOfMonths={numberOfMonths}
        formatters={{ formatCaption }}
        modifiersClassNames={{
          selected: defaultStyles.day_selected,
          today: defaultStyles.day_today,
          disabled: defaultStyles.day_disabled,
          range_middle: defaultStyles.day_range_middle,
          hidden: defaultStyles.day_hidden,
        }}
        classNames={{
          root: defaultStyles.root,
          caption: defaultStyles.caption,
          caption_label: defaultStyles.caption_label,
          nav: defaultStyles.nav,
          nav_button: defaultStyles.nav_button,
          nav_button_previous: defaultStyles.nav_button_previous,
          nav_button_next: defaultStyles.nav_button_next,
          table: defaultStyles.table,
          head_row: defaultStyles.head_row,
          head_cell: defaultStyles.head_cell,
          row: defaultStyles.row,
          cell: defaultStyles.cell,
          day: defaultStyles.day,
        }}
      />
      <div className="mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-red-100 border border-red-300"></span>
          <span className="text-gray-600">Booked dates</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block w-3 h-3 bg-primary-600"></span>
          <span className="text-gray-600">Selected dates</span>
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  selected: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }),
  ]),
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabledDates: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
      }),
    ])
  ),
  numberOfMonths: PropTypes.number,
  mode: PropTypes.oneOf(['single', 'multiple', 'range']),
  className: PropTypes.string,
};

export default Calendar;

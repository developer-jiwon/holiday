import { format, differenceInDays, parseISO, parse } from "date-fns"

export interface HolidayBase {
  id: number
  name: string
  date: string
  passed: boolean
}

export interface PastHoliday extends HolidayBase {
  passed: true
  daysPassed: number
}

export interface UpcomingHoliday extends HolidayBase {
  passed: false
  daysUntil: number
}

export type Holiday = PastHoliday | UpcomingHoliday

/**
 * Formats a date object into a short month and day format (e.g., "Jan 1")
 */
export function formatHolidayDate(date: Date): string {
  return format(date, "MMM d")
}

/**
 * Converts a holiday date string (e.g., "Jan 1") to a Date object for the specified year
 */
export function parseHolidayDate(dateString: string, year: number): Date {
  return parse(dateString, "MMM d", new Date(year, 0, 1))
}

/**
 * Calculate days until an upcoming holiday or days since a past holiday
 * Returns a positive number for upcoming holidays, negative for past holidays
 */
export function calculateDaysFromToday(holidayDate: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return differenceInDays(holidayDate, today)
}

/**
 * Determines if a holiday has already passed this year
 */
export function hasHolidayPassed(holidayDate: Date): boolean {
  return calculateDaysFromToday(holidayDate) < 0
}

/**
 * Creates a holiday object with calculated days and status
 */
export function createHolidayObject(id: number, name: string, dateString: string, year: number): Holiday {
  const date = parseHolidayDate(dateString, year)
  const daysFromToday = calculateDaysFromToday(date)
  const passed = daysFromToday < 0
  
  if (passed) {
    return {
      id,
      name,
      date: dateString,
      passed: true,
      daysPassed: Math.abs(daysFromToday)
    }
  } else {
    return {
      id,
      name,
      date: dateString,
      passed: false,
      daysUntil: daysFromToday
    }
  }
}

/**
 * Get all holidays for a specific year with calculated days and status
 */
export function getHolidaysForYear(year: number = new Date().getFullYear()): Holiday[] {
  // Base holiday list - can be extended
  const holidaysList = [
    { id: 1, name: "New Year's Day", date: "Jan 1" },
    { id: 2, name: "Orthodox Christmas", date: "Jan 7" },
    { id: 3, name: "Martin Luther King Jr. Day", date: "Jan 20" },
    { id: 4, name: "Chinese New Year", date: "Jan 29" },
    { id: 5, name: "Valentine's Day", date: "Feb 14" },
    { id: 6, name: "Family Day", date: "Feb 19" },
    { id: 7, name: "St. Patrick's Day", date: "Mar 17" },
    { id: 8, name: "Good Friday", date: "Apr 18" },
    { id: 9, name: "Easter Monday", date: "Apr 21" },
    { id: 10, name: "Earth Day", date: "Apr 22" },
    { id: 11, name: "Victoria Day", date: "May 20" },
    { id: 12, name: "Memorial Day", date: "May 26" },
    { id: 13, name: "Canada Day", date: "Jul 1" },
    { id: 14, name: "Independence Day", date: "Jul 4" },
    { id: 15, name: "Civic Holiday", date: "Aug 4" },
    { id: 16, name: "Labor Day", date: "Sep 1" },
    { id: 17, name: "National Day for Truth and Reconciliation", date: "Sep 30" },
    { id: 18, name: "Thanksgiving", date: "Oct 13" },
    { id: 19, name: "Halloween", date: "Oct 31" },
    { id: 20, name: "Remembrance Day", date: "Nov 11" },
    { id: 21, name: "US Thanksgiving", date: "Nov 27" },
    { id: 22, name: "Christmas Eve", date: "Dec 24" },
    { id: 23, name: "Christmas Day", date: "Dec 25" },
    { id: 24, name: "Boxing Day", date: "Dec 26" },
    { id: 25, name: "New Year's Eve", date: "Dec 31" },
  ]
  
  // Calculate days and status for each holiday
  return holidaysList.map(holiday => 
    createHolidayObject(holiday.id, holiday.name, holiday.date, year)
  )
} 
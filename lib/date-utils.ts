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
  // Default holiday list - this should be customizable based on country selection
  const holidaysList = [
    { id: 1, name: "New Year's Day", date: "Jan 1" },
    { id: 2, name: "Valentine's Day", date: "Feb 14" }, 
    { id: 3, name: "St. Patrick's Day", date: "Mar 17" },
    { id: 4, name: "Earth Day", date: "Apr 22" },
    { id: 5, name: "Labor Day", date: "May 1" },
    { id: 6, name: "Memorial Day", date: "May 26" },
    { id: 7, name: "Independence Day", date: "Jul 4" },
    { id: 8, name: "Halloween", date: "Oct 31" },
    { id: 9, name: "Veterans Day", date: "Nov 11" },
    { id: 10, name: "Thanksgiving", date: "Nov 27" },
    { id: 11, name: "Christmas Eve", date: "Dec 24" },
    { id: 12, name: "Christmas Day", date: "Dec 25" },
    { id: 13, name: "New Year's Eve", date: "Dec 31" },
  ]
  
  // Calculate days and status for each holiday
  return holidaysList.map(holiday => 
    createHolidayObject(holiday.id, holiday.name, holiday.date, year)
  )
}

// Function to get holidays for a specific country
// To be implemented when you're ready to add country selection
export function getHolidaysByCountry(country: string, year: number = new Date().getFullYear()): Holiday[] {
  // This is a placeholder for future implementation
  // You can expand this with different holiday lists for various countries
  switch (country.toLowerCase()) {
    case 'canada':
      return [
        { id: 1, name: "New Year's Day", date: "Jan 1" },
        { id: 2, name: "Family Day", date: "Feb 19" },
        { id: 3, name: "Good Friday", date: "Apr 18" },
        { id: 4, name: "Easter Monday", date: "Apr 21" },
        { id: 5, name: "Victoria Day", date: "May 20" },
        { id: 6, name: "National Indigenous Peoples Day", date: "Jun 21" },
        { id: 7, name: "Canada Day", date: "Jul 1" },
        { id: 8, name: "Civic Holiday", date: "Aug 4" },
        { id: 9, name: "Labor Day", date: "Sep 1" },
        { id: 10, name: "National Day for Truth and Reconciliation", date: "Sep 30" },
        { id: 11, name: "Thanksgiving", date: "Oct 13" },
        { id: 12, name: "Remembrance Day", date: "Nov 11" },
        { id: 13, name: "Christmas Day", date: "Dec 25" },
        { id: 14, name: "Boxing Day", date: "Dec 26" },
      ].map(holiday => createHolidayObject(holiday.id, holiday.name, holiday.date, year));
      
    case 'us':
    case 'usa':
    case 'united states':
      return [
        { id: 1, name: "New Year's Day", date: "Jan 1" },
        { id: 2, name: "Martin Luther King Jr. Day", date: "Jan 20" },
        { id: 3, name: "Presidents' Day", date: "Feb 17" },
        { id: 4, name: "Memorial Day", date: "May 26" },
        { id: 5, name: "Juneteenth", date: "Jun 19" },
        { id: 6, name: "Independence Day", date: "Jul 4" },
        { id: 7, name: "Labor Day", date: "Sep 1" },
        { id: 8, name: "Indigenous Peoples' Day", date: "Oct 13" },
        { id: 9, name: "Veterans Day", date: "Nov 11" },
        { id: 10, name: "Thanksgiving", date: "Nov 27" },
        { id: 11, name: "Christmas Day", date: "Dec 25" },
      ].map(holiday => createHolidayObject(holiday.id, holiday.name, holiday.date, year));
      
    case 'uk':
    case 'united kingdom':
      return [
        { id: 1, name: "New Year's Day", date: "Jan 1" },
        { id: 2, name: "Good Friday", date: "Apr 18" },
        { id: 3, name: "Easter Monday", date: "Apr 21" },
        { id: 4, name: "Early May Bank Holiday", date: "May 5" },
        { id: 5, name: "Spring Bank Holiday", date: "May 26" },
        { id: 6, name: "Summer Bank Holiday", date: "Aug 25" },
        { id: 7, name: "King's Birthday", date: "Jun 15" },
        { id: 8, name: "Remembrance Sunday", date: "Nov 9" },
        { id: 9, name: "Christmas Day", date: "Dec 25" },
        { id: 10, name: "Boxing Day", date: "Dec 26" },
      ].map(holiday => createHolidayObject(holiday.id, holiday.name, holiday.date, year));
      
    case 'australia':
      return [
        { id: 1, name: "New Year's Day", date: "Jan 1" },
        { id: 2, name: "Australia Day", date: "Jan 26" },
        { id: 3, name: "Good Friday", date: "Apr 18" },
        { id: 4, name: "Easter Monday", date: "Apr 21" },
        { id: 5, name: "Anzac Day", date: "Apr 25" },
        { id: 6, name: "King's Birthday", date: "Jun 9" },
        { id: 7, name: "NAIDOC Week", date: "Jul 7" },
        { id: 8, name: "Labor Day", date: "Oct 6" },
        { id: 9, name: "Melbourne Cup Day", date: "Nov 4" },
        { id: 10, name: "Christmas Day", date: "Dec 25" },
        { id: 11, name: "Boxing Day", date: "Dec 26" },
      ].map(holiday => createHolidayObject(holiday.id, holiday.name, holiday.date, year));
      
    case 'japan':
      return [
        { id: 1, name: "New Year's Day", date: "Jan 1" },
        { id: 2, name: "Coming of Age Day", date: "Jan 13" },
        { id: 3, name: "National Foundation Day", date: "Feb 11" },
        { id: 4, name: "Emperor's Birthday", date: "Feb 23" },
        { id: 5, name: "Vernal Equinox Day", date: "Mar 20" },
        { id: 6, name: "Showa Day", date: "Apr 29" },
        { id: 7, name: "Constitution Day", date: "May 3" },
        { id: 8, name: "Greenery Day", date: "May 4" },
        { id: 9, name: "Children's Day", date: "May 5" },
        { id: 10, name: "Marine Day", date: "Jul 21" },
        { id: 11, name: "Mountain Day", date: "Aug 11" },
        { id: 12, name: "Respect for the Aged Day", date: "Sep 15" },
        { id: 13, name: "Autumnal Equinox", date: "Sep 23" },
        { id: 14, name: "Health and Sports Day", date: "Oct 13" },
        { id: 15, name: "Culture Day", date: "Nov 3" },
        { id: 16, name: "Labor Thanksgiving Day", date: "Nov 23" },
      ].map(holiday => createHolidayObject(holiday.id, holiday.name, holiday.date, year));
    
    case 'china':
      return [
        { id: 1, name: "New Year's Day", date: "Jan 1" },
        { id: 2, name: "Chinese New Year", date: "Feb 10" }, // Lunar New Year for 2025
        { id: 3, name: "Women's Day", date: "Mar 8" },
        { id: 4, name: "Qingming Festival", date: "Apr 4" },
        { id: 5, name: "Labour Day", date: "May 1" },
        { id: 6, name: "Youth Day", date: "May 4" },
        { id: 7, name: "Dragon Boat Festival", date: "Jun 1" }, // Approximate for 2025
        { id: 8, name: "CPC Founding Day", date: "Jul 1" },
        { id: 9, name: "Army Day", date: "Aug 1" },
        { id: 10, name: "Mid-Autumn Festival", date: "Sep 29" }, // Approximate for 2025
        { id: 11, name: "National Day", date: "Oct 1" },
      ].map(holiday => createHolidayObject(holiday.id, holiday.name, holiday.date, year));
    
    case 'taiwan':
      return [
        { id: 1, name: "New Year's Day", date: "Jan 1" },
        { id: 2, name: "Lunar New Year", date: "Feb 10" }, // Lunar New Year for 2025
        { id: 3, name: "Peace Memorial Day", date: "Feb 28" },
        { id: 4, name: "Women and Children's Day", date: "Apr 4" },
        { id: 5, name: "Tomb Sweeping Day", date: "Apr 5" },
        { id: 6, name: "Labour Day", date: "May 1" },
        { id: 7, name: "Dragon Boat Festival", date: "Jun 1" }, // Approximate for 2025
        { id: 8, name: "Mid-Autumn Festival", date: "Sep 29" }, // Approximate for 2025
        { id: 9, name: "National Day", date: "Oct 10" },
        { id: 10, name: "Taiwan Retrocession Day", date: "Oct 25" },
        { id: 11, name: "Constitution Day", date: "Dec 25" },
      ].map(holiday => createHolidayObject(holiday.id, holiday.name, holiday.date, year));
    
    case 'korea':
    case 'south korea':
      return [
        { id: 1, name: "New Year's Day", date: "Jan 1" },
        { id: 2, name: "Seollal (Lunar New Year)", date: "Feb 10" }, // Lunar New Year for 2025
        { id: 3, name: "Independence Movement Day", date: "Mar 1" },
        { id: 4, name: "Children's Day", date: "May 5" },
        { id: 5, name: "Buddha's Birthday", date: "May 12" }, // Approximate for 2025
        { id: 6, name: "Memorial Day", date: "Jun 6" },
        { id: 7, name: "Constitution Day", date: "Jul 17" },
        { id: 8, name: "Liberation Day", date: "Aug 15" },
        { id: 9, name: "Chuseok (Harvest Festival)", date: "Sep 12" }, // Approximate for 2025
        { id: 10, name: "National Foundation Day", date: "Oct 3" },
        { id: 11, name: "Hangul Day", date: "Oct 9" },
        { id: 12, name: "Christmas Day", date: "Dec 25" },
      ].map(holiday => createHolidayObject(holiday.id, holiday.name, holiday.date, year));
      
    // Add more countries as needed
      
    default:
      // Return the default holiday list if no country matches or for testing
      return getHolidaysForYear(year);
  }
} 
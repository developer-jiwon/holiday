// Sample holiday data for 2025
const holidays = [
  { id: 1, name: "New Year's Day", date: "Jan 1", daysPassed: 60, passed: true },
  { id: 2, name: "Orthodox Christmas", date: "Jan 7", daysPassed: 54, passed: true },
  { id: 3, name: "Martin Luther King Jr. Day", date: "Jan 20", daysPassed: 41, passed: true },
  { id: 4, name: "Chinese New Year", date: "Jan 29", daysPassed: 32, passed: true },
  { id: 5, name: "Valentine's Day", date: "Feb 14", daysPassed: 16, passed: true },
  { id: 6, name: "Family Day", date: "Feb 19", daysPassed: 11, passed: true },
  { id: 7, name: "St. Patrick's Day", date: "Mar 17", daysPassed: 15, passed: true },
  { id: 8, name: "Good Friday", date: "Apr 18", daysPassed: 47, passed: true },
  { id: 9, name: "Easter Monday", date: "Apr 21", daysPassed: 50, passed: true },
  { id: 10, name: "Earth Day", date: "Apr 22", daysPassed: 51, passed: true },
  { id: 11, name: "Victoria Day", date: "May 20", daysUntil: 32, passed: false },
  { id: 12, name: "Memorial Day", date: "May 26", daysUntil: 38, passed: false },
  { id: 13, name: "Canada Day", date: "Jul 1", daysUntil: 74, passed: false },
  { id: 14, name: "Independence Day", date: "Jul 4", daysUntil: 77, passed: false },
  { id: 15, name: "Civic Holiday", date: "Aug 4", daysUntil: 108, passed: false },
  { id: 16, name: "Labor Day", date: "Sep 1", daysUntil: 136, passed: false },
  { id: 17, name: "National Day for Truth and Reconciliation", date: "Sep 30", daysUntil: 165, passed: false },
  { id: 18, name: "Thanksgiving", date: "Oct 13", daysUntil: 178, passed: false },
  { id: 19, name: "Halloween", date: "Oct 31", daysUntil: 196, passed: false },
  { id: 20, name: "Remembrance Day", date: "Nov 11", daysUntil: 207, passed: false },
  { id: 21, name: "US Thanksgiving", date: "Nov 27", daysUntil: 223, passed: false },
  { id: 22, name: "Christmas Eve", date: "Dec 24", daysUntil: 250, passed: false },
  { id: 23, name: "Christmas Day", date: "Dec 25", daysUntil: 251, passed: false },
  { id: 24, name: "Boxing Day", date: "Dec 26", daysUntil: 252, passed: false },
  { id: 25, name: "New Year's Eve", date: "Dec 31", daysUntil: 257, passed: false },
]

export function HolidayPuzzleGrid() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {holidays.map((holiday) => (
        <div
          key={holiday.id}
          className={`flex h-16 w-16 flex-col items-center justify-center rounded-lg p-1 text-center ${
            holiday.passed
              ? "bg-gradient-to-br from-[#a38b7b] to-[#8b6e5a] text-white shadow-sm"
              : "border-2 border-[#e6d7c3] bg-[#f9f4ec]/50 text-[#8b6e5a] shadow-sm"
          }`}
        >
          <div className="text-xs font-medium line-clamp-1 w-full">{holiday.name.split(" ")[0]}</div>
          <div className="text-xs mt-auto">
            {holiday.passed ? (
              <span>✓ {holiday.date}</span>
            ) : holiday.daysUntil === 0 ? (
              <span className="font-medium">Today</span>
            ) : (
              <span>
                +{holiday.daysUntil}d / {holiday.date}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

import type { Trip } from "@/types/trips";

/** Demo content lives here so the prototype can be changed without editing screens. */
export const demoUser = {
  name: "Alex Chen",
  email: "alex.chen@email.com",
  homeCity: "Chicago, IL",
};

export const demoTrips: Trip[] = [
  {
    id: "lisbon-2027",
    name: "Lisbon, together",
    destination: "Lisbon, Portugal",
    dateLabel: "Jun 12 – Jun 16, 2027",
    dates: "Jun 12 – Jun 16",
    days: 5,
    budget: 2400,
    currency: "EUR",
    status: "planning",
    image: require("../../assets/images/lisbon-hero.png"),
    members: [
      { id: "alex", name: "Alex Chen", role: "You", color: "blue" },
      { id: "morgan", name: "Morgan Lee", color: "pink" },
      { id: "jamie", name: "Jamie Parker", color: "yellow" },
      { id: "sam", name: "Sam Rivera", color: "green" },
    ],
    itinerary: [
      { id: "flight", time: "10:30", title: "Touch down in Lisbon", location: "Lisbon Airport · Terminal 1", note: "Flight TP 203 · all 4 travelers", icon: "airplane-outline" },
      { id: "check-in", time: "12:00", title: "Drop bags & check in", location: "Casa Alfama · Rua dos Remédios", note: "Reservation with Alex", icon: "bed-outline" },
      { id: "miradouro", time: "14:00", title: "Get lost in Alfama", location: "Miradouro das Portas do Sol", note: "Tram 28 + a pastel de nata stop", icon: "camera-outline" },
      { id: "dinner", time: "19:00", title: "Dinner with the crew", location: "Time Out Market · Cais do Sodré", note: "€45 per person · added by Morgan", icon: "restaurant-outline" },
    ],
    tasks: [
      { id: "maps", title: "Download offline maps", due: "Jun 8", assignee: "Sam", done: false },
      { id: "flights", title: "Share flight confirmations", due: "Jun 5", assignee: "Morgan", done: false },
      { id: "sintra", title: "Plan our Sintra day trip", due: "Jun 7", assignee: "Jamie", done: false },
      { id: "adapters", title: "Pack adapters & essentials", due: "Jun 11", assignee: "Alex", done: false },
      { id: "dinner-booking", title: "Reserve dinner at Prado", due: "May 30", assignee: "Jamie", done: true },
      { id: "stay", title: "Book our Alfama stay", due: "May 24", assignee: "Alex", done: true },
    ],
    expenses: [
      { id: "stay-cost", title: "Casa Alfama · 4 nights", detail: "Alex paid · split equally", amount: 960, paidBy: "Alex", icon: "bed-outline" },
      { id: "flight-cost", title: "Flights · group booking", detail: "Morgan paid · split equally", amount: 440, paidBy: "Morgan", icon: "airplane-outline" },
      { id: "dinner-cost", title: "Time Out Market dinner", detail: "Jamie paid · split equally", amount: 180, paidBy: "Jamie", icon: "restaurant-outline" },
      { id: "transit-cost", title: "Tram & metro passes", detail: "Sam paid · split equally", amount: 60, paidBy: "Sam", icon: "bus-outline" },
    ],
    messages: [
      { id: "msg-1", sender: "Morgan", message: "Found our first-night dinner spot! So many options, and right by the water. 😍", time: "9:24" },
      { id: "msg-2", sender: "Jamie", message: "Love it! I booked €180 in food credit for the four of us. Added it to our budget.", time: "9:28" },
      { id: "msg-3", sender: "You", message: "Perfect. I’ve added dinner at 7 PM on Saturday. Our first sunset together!", time: "9:31" },
      { id: "msg-4", sender: "Sam", message: "Transit passes are sorted too. I’ll download the offline maps before we go.", time: "9:35" },
    ],
  },
  {
    id: "algarve-weekend",
    name: "Algarve long weekend",
    destination: "Lagos, Portugal",
    dateLabel: "Sep 4 – Sep 7, 2027",
    dates: "Sep 4 – Sep 7",
    days: 4,
    budget: 1800,
    currency: "EUR",
    status: "planning",
    image: require("../../assets/images/lisbon-hero.png"),
    members: [
      { id: "alex", name: "Alex Chen", role: "You", color: "blue" },
      { id: "morgan", name: "Morgan Lee", color: "pink" },
      { id: "jamie", name: "Jamie Parker", color: "yellow" },
    ],
    itinerary: [],
    tasks: [{ id: "stay", title: "Find a place by the coast", due: "Aug 1", assignee: "Morgan", done: false }],
    expenses: [],
    messages: [],
  },
];

export const demoInspiration = {
  title: "Escape to the Algarve",
  subtitle: "Coastal walks. Clear calendars.",
  eyebrow: "THE LONG WEEKEND",
  image: require("../../assets/images/lisbon-hero.png"),
};

export const demoNotifications = [
  { id: "n1", title: "Morgan added a dinner spot", detail: "Time Out Market · Lisbon, together", time: "12 min ago", icon: "restaurant-outline" as const, unread: true },
  { id: "n2", title: "Jamie marked a task complete", detail: "Book our Alfama stay", time: "2 hours ago", icon: "checkmark-circle-outline" as const, unread: true },
  { id: "n3", title: "Sam shared a trip update", detail: "Algarve long weekend", time: "Yesterday", icon: "airplane-outline" as const, unread: false },
];


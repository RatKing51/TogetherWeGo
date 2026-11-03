export type TripStatus = "planning" | "confirmed" | "completed";

export type TripMember = {
  id: string;
  name: string;
  role?: string;
  color: "blue" | "pink" | "yellow" | "green";
};

export type ItineraryActivity = {
  id: string;
  time: string;
  title: string;
  location: string;
  note?: string;
  icon: "airplane-outline" | "bed-outline" | "camera-outline" | "restaurant-outline" | "walk-outline";
};

export type TripTask = {
  id: string;
  title: string;
  due: string;
  assignee: string;
  done: boolean;
};

export type TripExpense = {
  id: string;
  title: string;
  detail: string;
  amount: number;
  paidBy: string;
  icon: "bed-outline" | "airplane-outline" | "restaurant-outline" | "bus-outline" | "cart-outline";
};

export type TripMessage = {
  id: string;
  sender: string;
  message: string;
  time: string;
};

export type Trip = {
  id: string;
  name: string;
  destination: string;
  dateLabel: string;
  dates: string;
  days: number;
  budget: number;
  currency: string;
  status: TripStatus;
  members: TripMember[];
  image: number;
  itinerary: ItineraryActivity[];
  tasks: TripTask[];
  expenses: TripExpense[];
  messages: TripMessage[];
};

export type TripSection = "Overview" | "Itinerary" | "Budget" | "Chat" | "Tasks";

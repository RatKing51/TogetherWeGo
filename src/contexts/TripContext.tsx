import React, { createContext, useContext, useMemo, useState } from "react";
import { demoTrips, demoUser } from "@/data/demo";
import type { Trip, TripExpense, TripMessage } from "@/types/trips";

type NewTripInput = Pick<Trip, "name" | "destination" | "dateLabel" | "dates" | "days" | "budget" | "currency">;
type TripContextValue = {
  trips: Trip[];
  user: typeof demoUser;
  addTrip: (input: NewTripInput) => Trip;
  toggleTask: (tripId: string, taskId: string) => void;
  addExpense: (tripId: string, expense: Omit<TripExpense, "id">) => void;
  addMessage: (tripId: string, message: string) => void;
  addTask: (tripId: string, title: string) => void;
  addActivity: (tripId: string, title: string, location: string) => void;
};

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState(demoTrips);

  const value = useMemo<TripContextValue>(() => ({
    trips,
    user: demoUser,
    addTrip: (input) => {
      const trip: Trip = {
        ...input,
        id: `trip-${Date.now()}`,
        status: "planning",
        image: require("../../assets/images/lisbon-hero.png"),
        members: [
          { id: "alex", name: demoUser.name, role: "You", color: "blue" },
          { id: "morgan", name: "Morgan Lee", color: "pink" },
          { id: "jamie", name: "Jamie Parker", color: "yellow" },
        ],
        itinerary: [],
        tasks: [],
        expenses: [],
        messages: [],
      };
      setTrips((current) => [trip, ...current]);
      return trip;
    },
    toggleTask: (tripId, taskId) => setTrips((current) => current.map((trip) => trip.id !== tripId ? trip : {
      ...trip,
      tasks: trip.tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task),
    })),
    addExpense: (tripId, expense) => setTrips((current) => current.map((trip) => trip.id !== tripId ? trip : {
      ...trip,
      expenses: [...trip.expenses, { ...expense, id: `expense-${Date.now()}` }],
    })),
    addMessage: (tripId, message) => setTrips((current) => current.map((trip) => trip.id !== tripId ? trip : {
      ...trip,
      messages: [...trip.messages, { id: `message-${Date.now()}`, sender: "You", message, time: "now" } as TripMessage],
    })),
    addTask: (tripId, title) => setTrips((current) => current.map((trip) => trip.id !== tripId ? trip : {
      ...trip,
      tasks: [...trip.tasks, { id: `task-${Date.now()}`, title, due: "Jun 10", assignee: "You", done: false }],
    })),
    addActivity: (tripId, title, location) => setTrips((current) => current.map((trip) => trip.id !== tripId ? trip : {
      ...trip,
      itinerary: [...trip.itinerary, { id: `activity-${Date.now()}`, time: "12:00", title, location, icon: "walk-outline" }],
    })),
  }), [trips]);

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrips() {
  const context = useContext(TripContext);
  if (!context) throw new Error("useTrips must be used inside TripProvider");
  return context;
}

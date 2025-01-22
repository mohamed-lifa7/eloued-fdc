import { getEventsByStatus } from "@/data/events";
import { type Metadata } from "next";
import React from "react";
import { EventComponent } from "./event";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover our upcoming and past events, showcasing activities, workshops, and gatherings designed to inspire and engage the community. Stay updated and explore the highlights of our journey!",
};

const page = async () => {
  const pastEvents = await getEventsByStatus("past");
  const upcomingEvents = await getEventsByStatus("upcoming");
  const activeEvents = await getEventsByStatus("active");

  return (
    <main className="container my-20 min-h-screen max-w-4xl space-y-8">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-semibold lg:text-5xl">Events</h1>
        <p>
          Discover our upcoming and past events, showcasing activities,
          workshops, and gatherings designed to inspire and engage the
          community. Stay updated and explore the highlights of our journey!
        </p>
      </div>
      {activeEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-medium lg:text-3xl">Active Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {activeEvents.map((event) => (
              <EventComponent key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {upcomingEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold lg:text-3xl">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {upcomingEvents.map((event) => (
              <EventComponent key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
      {pastEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold lg:text-3xl">Past Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {pastEvents.map((event) => (
              <EventComponent key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default page;

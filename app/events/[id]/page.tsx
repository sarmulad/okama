"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  CreditCard,
  Ticket,
  Star,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Toast from "@/components/toast-notification";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useParams } from "next/navigation";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  maxPerOrder: number;
  benefits: string[];
}

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  description: string;
  image: string;
  ticketTypes: TicketType[];
  ageRestriction: string;
  duration: string;
  genre: string[];
}

// Mock event database
const eventDatabase: { [key: string]: EventData } = {
  "sacred-winds-tour-2024": {
    id: "sacred-winds-tour-2024",
    title: "OKAMA Live: Sacred Winds Tour",
    date: "2024-03-15",
    time: "8:00 PM",
    venue: "Red Rocks Amphitheatre",
    address: "18300 W Alameda Pkwy",
    city: "Morrison",
    state: "CO",
    description:
      "Join OKAMA for an unforgettable evening of indigenous worship music under the stars at the iconic Red Rocks Amphitheatre. Experience the power of ancient sounds meeting modern worship in one of the world's most beautiful venues.",
    image: "/placeholder.svg?height=400&width=800&text=Red+Rocks+Concert",
    ticketTypes: [
      {
        id: "general",
        name: "General Admission",
        price: 45.0,
        description: "Standing room access to the main floor",
        available: 500,
        maxPerOrder: 8,
        benefits: ["General admission access", "Merchandise discount"],
      },
      {
        id: "reserved",
        name: "Reserved Seating",
        price: 75.0,
        description: "Reserved seats with great views",
        available: 200,
        maxPerOrder: 6,
        benefits: [
          "Reserved seating",
          "Early venue entry",
          "Merchandise discount",
        ],
      },
      {
        id: "vip",
        name: "VIP Experience",
        price: 150.0,
        description: "Premium experience with meet & greet",
        available: 50,
        maxPerOrder: 4,
        benefits: [
          "Premium seating",
          "Meet & greet with band",
          "Exclusive merchandise",
          "VIP lounge access",
          "Complimentary drinks",
        ],
      },
    ],
    ageRestriction: "All ages welcome",
    duration: "Approximately 2.5 hours",
    genre: ["Indigenous", "Worship", "Contemporary"],
  },
  "spirit-gathering-2024": {
    id: "spirit-gathering-2024",
    title: "Spirit Gathering Festival",
    date: "2024-04-20",
    time: "6:00 PM",
    venue: "Taos Pueblo",
    address: "120 Veterans Hwy",
    city: "Taos",
    state: "NM",
    description:
      "A sacred gathering celebrating indigenous culture and contemporary worship. Join us for an evening of traditional ceremonies, modern music, and spiritual connection in the historic Taos Pueblo.",
    image: "/placeholder.svg?height=400&width=800&text=Taos+Pueblo+Festival",
    ticketTypes: [
      {
        id: "general",
        name: "General Admission",
        price: 35.0,
        description: "Access to all festival areas",
        available: 800,
        maxPerOrder: 10,
        benefits: [
          "Festival access",
          "Traditional food vendors",
          "Cultural workshops",
        ],
      },
      {
        id: "premium",
        name: "Premium Experience",
        price: 85.0,
        description: "Enhanced festival experience",
        available: 150,
        maxPerOrder: 6,
        benefits: [
          "Premium viewing area",
          "Meet & greet",
          "Exclusive merchandise",
          "Traditional meal included",
        ],
      },
    ],
    ageRestriction: "Family friendly - all ages",
    duration: "Full evening event - 4 hours",
    genre: ["Traditional", "Indigenous", "Cultural"],
  },
  "ancestral-voices-2024": {
    id: "ancestral-voices-2024",
    title: "Ancestral Voices Concert",
    date: "2024-05-10",
    time: "7:30 PM",
    venue: "Wolf Trap",
    address: "1551 Trap Rd",
    city: "Vienna",
    state: "VA",
    description:
      "An intimate acoustic performance featuring traditional indigenous songs passed down through generations, reimagined for contemporary audiences. Experience the raw power of ancestral voices in this unique venue.",
    image: "/placeholder.svg?height=400&width=800&text=Wolf+Trap+Concert",
    ticketTypes: [
      {
        id: "lawn",
        name: "Lawn Seating",
        price: 25.0,
        description: "Bring your blanket and enjoy from the lawn",
        available: 1000,
        maxPerOrder: 12,
        benefits: ["Lawn access", "Picnic friendly", "Relaxed atmosphere"],
      },
      {
        id: "pavilion",
        name: "Pavilion Seating",
        price: 65.0,
        description: "Covered seating with excellent acoustics",
        available: 300,
        maxPerOrder: 8,
        benefits: ["Covered seating", "Premium sound", "Reserved seats"],
      },
    ],
    ageRestriction: "All ages welcome",
    duration: "2 hours with intermission",
    genre: ["Acoustic", "Traditional", "Storytelling"],
  },
  "summer-solstice-2024": {
    id: "summer-solstice-2024",
    title: "Summer Solstice Celebration",
    date: "2024-06-21",
    time: "Sunset",
    venue: "Cheyenne River",
    address: "Cheyenne River Reservation",
    city: "Eagle Butte",
    state: "SD",
    description:
      "Celebrate the longest day of the year with a traditional summer solstice ceremony followed by contemporary worship music. This outdoor celebration honors both ancient traditions and modern faith.",
    image:
      "/placeholder.svg?height=400&width=800&text=Summer+Solstice+Celebration",
    ticketTypes: [
      {
        id: "ceremony",
        name: "Ceremony Access",
        price: 20.0,
        description: "Access to traditional ceremony and music",
        available: 500,
        maxPerOrder: 6,
        benefits: [
          "Ceremony participation",
          "Traditional feast",
          "Cultural education",
        ],
      },
      {
        id: "full-experience",
        name: "Full Experience",
        price: 50.0,
        description: "Complete solstice celebration experience",
        available: 200,
        maxPerOrder: 4,
        benefits: [
          "All ceremony access",
          "VIP seating",
          "Traditional gifts",
          "Elder storytelling session",
        ],
      },
    ],
    ageRestriction: "Respectful attendees of all ages",
    duration: "Sunset to late evening",
    genre: ["Ceremonial", "Traditional", "Spiritual"],
  },
};

export default function EventBookingPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: number;
  }>({});
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    // Get event from database
    const eventData = eventDatabase[eventId];
    if (eventData) {
      setEvent(eventData);
    } else {
      // If event not found, show error
      showToast("Event not found", "error");
    }
  }, [eventId, showToast]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading event...</p>
        </div>
      </div>
    );
  }

  const updateTicketQuantity = (ticketId: string, quantity: number) => {
    const ticketType = event.ticketTypes.find((t) => t.id === ticketId);
    if (!ticketType) return;

    const maxAllowed = Math.min(ticketType.available, ticketType.maxPerOrder);
    const newQuantity = Math.max(0, Math.min(maxAllowed, quantity));

    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: newQuantity,
    }));
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce(
      (total, [ticketId, quantity]) => {
        const ticketType = event.ticketTypes.find((t) => t.id === ticketId);
        return total + (ticketType ? ticketType.price * quantity : 0);
      },
      0
    );
  };

  const getServiceFee = () => {
    return getTotalPrice() * 0.1; // 10% service fee
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getServiceFee();
  };

  const handleProceedToCheckout = () => {
    if (getTotalTickets() === 0) {
      showToast("Please select at least one ticket", "error");
      return;
    }
    setCurrentStep(2);
  };

  const handleCompleteBooking = () => {
    if (
      !customerInfo.firstName ||
      !customerInfo.lastName ||
      !customerInfo.email
    ) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    // In real app, process payment here
    showToast("Booking confirmed! Check your email for tickets.", "success");
    setCurrentStep(3);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Join me at ${event.title} on ${new Date(
            event.date
          ).toLocaleDateString()}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Event link copied to clipboard!", "success");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Breadcrumb */}
      <section className="pt-24 pb-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <Link
              href="/#events"
              className="hover:text-pink-500 transition-colors flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Events
            </Link>
            <span>/</span>
            <span className="text-white">Book Tickets</span>
          </motion.div>
        </div>
      </section>

      {/* Event Header */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Event Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-pink-500 mb-2">Live Concert</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {event.title}
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl md:text-4xl font-bold lg:hidden">
                  {event.title}
                </h1>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-gray-600 hover:border-pink-500 bg-transparent"
                >
                  <Share2 size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="text-pink-500" size={20} />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="text-pink-500" size={20} />
                  <span>
                    {event.time} • {event.duration}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="text-pink-500 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">{event.venue}</p>
                    <p>{event.address}</p>
                    <p>
                      {event.city}, {event.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Users className="text-pink-500" size={20} />
                  <span>{event.ageRestriction}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {event.genre.map((g) => (
                  <Badge
                    key={g}
                    variant="outline"
                    className="border-amber-600 text-amber-600"
                  >
                    {g}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed">
                {event.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-amber-500 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  (4.9) Based on previous shows
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step
                        ? "bg-pink-500 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  <span
                    className={`ml-2 ${
                      currentStep >= step ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step === 1
                      ? "Select Tickets"
                      : step === 2
                      ? "Customer Info"
                      : "Confirmation"}
                  </span>
                  {step < 3 && <div className="w-8 h-px bg-gray-600 mx-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Ticket Selection */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">
                Select Your Tickets
              </h2>

              <div className="space-y-6">
                {event.ticketTypes.map((ticketType) => (
                  <Card
                    key={ticketType.id}
                    className="bg-gray-800 border-gray-700"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-xl font-bold">
                              {ticketType.name}
                            </h3>
                            <span className="text-2xl font-bold text-pink-500">
                              ${ticketType.price}
                            </span>
                          </div>
                          <p className="text-gray-400 mb-3">
                            {ticketType.description}
                          </p>

                          <div className="space-y-1">
                            {ticketType.benefits.map((benefit, index) => (
                              <p key={index} className="text-sm text-gray-300">
                                • {benefit}
                              </p>
                            ))}
                          </div>

                          <p className="text-sm text-gray-500 mt-2">
                            {ticketType.available} tickets available • Max{" "}
                            {ticketType.maxPerOrder} per order
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-600 rounded-lg">
                            <button
                              onClick={() =>
                                updateTicketQuantity(
                                  ticketType.id,
                                  (selectedTickets[ticketType.id] || 0) - 1
                                )
                              }
                              className="p-2 hover:bg-gray-700 transition-colors"
                              disabled={!selectedTickets[ticketType.id]}
                            >
                              -
                            </button>
                            <span className="px-4 py-2 min-w-[60px] text-center">
                              {selectedTickets[ticketType.id] || 0}
                            </span>
                            <button
                              onClick={() =>
                                updateTicketQuantity(
                                  ticketType.id,
                                  (selectedTickets[ticketType.id] || 0) + 1
                                )
                              }
                              className="p-2 hover:bg-gray-700 transition-colors"
                              disabled={
                                (selectedTickets[ticketType.id] || 0) >=
                                Math.min(
                                  ticketType.available,
                                  ticketType.maxPerOrder
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              {getTotalTickets() > 0 && (
                <Card className="bg-gray-800 border-gray-700 mt-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(selectedTickets).map(
                        ([ticketId, quantity]) => {
                          if (quantity === 0) return null;
                          const ticketType = event.ticketTypes.find(
                            (t) => t.id === ticketId
                          );
                          if (!ticketType) return null;

                          return (
                            <div
                              key={ticketId}
                              className="flex justify-between"
                            >
                              <span>
                                {quantity}x {ticketType.name}
                              </span>
                              <span>
                                ${(ticketType.price * quantity).toFixed(2)}
                              </span>
                            </div>
                          );
                        }
                      )}
                      <div className="border-t border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between text-gray-400">
                          <span>Subtotal</span>
                          <span>${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Service Fee</span>
                          <span>${getServiceFee().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-pink-500 mt-2">
                          <span>Total</span>
                          <span>${getFinalTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleProceedToCheckout}
                      className="w-full mt-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                    >
                      <Ticket size={20} className="mr-2" />
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* Step 2: Customer Information */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">
                Customer Information
              </h2>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(selectedTickets).map(
                        ([ticketId, quantity]) => {
                          if (quantity === 0) return null;
                          const ticketType = event.ticketTypes.find(
                            (t) => t.id === ticketId
                          );
                          if (!ticketType) return null;

                          return (
                            <div
                              key={ticketId}
                              className="flex justify-between"
                            >
                              <span>
                                {quantity}x {ticketType.name}
                              </span>
                              <span>
                                ${(ticketType.price * quantity).toFixed(2)}
                              </span>
                            </div>
                          );
                        }
                      )}
                      <div className="border-t border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between font-bold text-pink-500">
                          <span>Total</span>
                          <span>${getFinalTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="flex-1 border-gray-600"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleCompleteBooking}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                    >
                      <CreditCard size={20} className="mr-2" />
                      Complete Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-8 mb-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ticket size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-gray-300 mb-6">
                  Your tickets have been booked successfully. You will receive a
                  confirmation email with your tickets shortly.
                </p>

                <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-bold mb-2">Booking Details</h3>
                  <p>
                    <strong>Event:</strong> {event.title}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Venue:</strong> {event.venue}
                  </p>
                  <p>
                    <strong>Total:</strong> ${getFinalTotal().toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Link href="/" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 bg-transparent"
                    >
                      Back to Home
                    </Button>
                  </Link>
                  <Link href="/#events" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
                      View More Events
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

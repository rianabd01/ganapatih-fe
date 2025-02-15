export const limitOptions = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
  { label: "200", value: 200 },
  { label: "500", value: 500 },
  { label: "1000", value: 1000 },
];

export const sortByOptions = [
  { label: "Highest Fare", value: "fare_amount:DESC" },
  { label: "Lowest Fare", value: "fare_amount:ASC" },
  { label: "Earliest Pickup", value: "pickup_datetime:ASC" },
  { label: "Latest Pickup", value: "pickup_datetime:DESC" },
  { label: "Shortest Distance", value: "trip_distance:ASC" },
  { label: "Longest Distance", value: "trip_distance:DESC" },
  { label: "Payment Type (A-Z)", value: "payment_type:ASC" },
  { label: "Payment Type (Z-A)", value: "payment_type:DESC" },
];

export const paymentTypeOptions = [
  { label: "Cash", value: "CSH" },
  { label: "Credit Card", value: "CRD" },
  { label: "Unknown", value: "UNK" },
  { label: "No Charge", value: "NOC" },
  { label: "Discount", value: "DIS" },
];

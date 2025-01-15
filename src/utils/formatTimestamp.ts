export function formatTimestamp(timestamp: { seconds: number; nanoseconds: number }) {
  // Convert seconds and nanoseconds to milliseconds
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const date = new Date(milliseconds);

  // Format time as HH:mm
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

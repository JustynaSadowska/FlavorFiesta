export function formatPreparationTime(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours} h ${remainingMinutes} min`
      : `${hours} h`;
  }
  return `${minutes} min`;
}

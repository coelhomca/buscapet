export default function useHoursFrom(date: Date) {
    return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
  }
/**
 * A predictable random number generator using a seed value.
 * Implementation based on mulberry32 algorithm.
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  /**
   * Generates a random number between 0 and 1
   */
  next(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Generates an integer between min (inclusive) and max (inclusive)
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generates an array of n unique random integers between min and max (inclusive)
   */
  uniqueInts(n: number, min: number, max: number): number[] {
    if (max - min + 1 < n) {
      throw new Error("Range too small to generate unique numbers");
    }

    const numbers = new Set<number>();
    while (numbers.size < n) {
      numbers.add(this.nextInt(min, max));
    }

    return Array.from(numbers);
  }
}

/**
 * Creates a seed from a date string in YYYY-MM-DD format
 */
export const getDateSeed = (dateStr: string): number => {
  // Remove dashes and convert to number for consistent seeding
  return parseInt(dateStr.replace(/-/g, ""));
};

/**
 * Generates daily game numbers
 */
export const generateDailyNumbers = (
  dateStr: string,
  count: number
): number[] => {
  const rng = new SeededRandom(getDateSeed(dateStr));
  return rng.uniqueInts(count, 1, 999);
};

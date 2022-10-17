interface Data {
  id: number;
  keyword: string;
  importance: number;
  frequency: number;
}

function createData(id: number, keyword: string, importance: number, frequency: number): Data {
  return {
    id,
    keyword,
    importance,
    frequency,
  };
}

export const mockKeywords = [
  createData(1, 'watching netflix', 26.12, 101),
  createData(2, 'drinking wine', 24, 99),
  createData(3, 'wine', 23.99, 17),
  createData(4, 'hot tub', 23.5, 185),
  createData(5, 'drinking', 22.55, 23),
  createData(6, 'series', 22.43, 18),
  createData(7, 'raining', 22.16, 1),
  createData(8, 'home', 21.78, 9),
  createData(9, 'fall asleep', 18.34, 83),
  createData(10, 'couch watching netflix', 14.2, 101),
  createData(11, 'netflix', 9.59, 62),
  createData(12, 'pizza', 9.31, 52),
  createData(13, 'relaxing', 4.12, 111),
  createData(14, 'laundry', 1.85, 59),
];

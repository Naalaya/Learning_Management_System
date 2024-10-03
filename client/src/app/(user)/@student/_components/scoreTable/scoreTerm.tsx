export type ScoreTerm = {
  stt: number;
  nhhk: string;
  dtbhk: number | null;
  dtbtlhk: number;
};
//  Replace with scoreData at server
export const scoreData: ScoreTerm[] = [
  { stt: 1, nhhk: "20211", dtbhk: 3.47, dtbtlhk: 3.47 },
  { stt: 2, nhhk: "20212", dtbhk: 1.91, dtbtlhk: 2.76 },
  { stt: 3, nhhk: "20213", dtbhk: 1.96, dtbtlhk: 2.54 },
  { stt: 4, nhhk: "20221", dtbhk: 1.83, dtbtlhk: 2.43 },
  { stt: 5, nhhk: "20222", dtbhk: 2.8, dtbtlhk: 2.51 },
  { stt: 6, nhhk: "20223", dtbhk: 2.67, dtbtlhk: 2.66 },
  { stt: 7, nhhk: "20231", dtbhk: 3.08, dtbtlhk: 2.73 },
  { stt: 8, nhhk: "20232", dtbhk: 3.36, dtbtlhk: 2.79 },
];

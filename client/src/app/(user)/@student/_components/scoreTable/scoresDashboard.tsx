"use client";

import { scoreData, ScoreTerm } from "./scoreTerm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Award } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ScoresDashboard = () => {
  const [selectedTerm, setSelectedTerm] = useState<ScoreTerm>(
    scoreData[scoreData.length - 1]
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTermClick = (term: ScoreTerm) => {
    setSelectedTerm(term);
    const validScores = scoreData
      .map((t) => t.dtbhk)
      .filter((score): score is number => score !== null);
    if (term.dtbhk === Math.max(...validScores)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getPerformanceIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="text-green-500" />;
    if (current < previous) return <TrendingDown className="text-red-500" />;
    return null;
  };

  return (
    <Card className="w-full md:block m-auto h-fit rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl">
        <CardTitle className="flex items-center text-2xl">
          <Trophy className="mr-2" />
          Điểm trung bình các học kỳ
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Biểu đồ</TabsTrigger>
            <TabsTrigger value="table">Bảng điểm</TabsTrigger>
          </TabsList>
          {/* Biểu Đồ */}
          <TabsContent value="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreData}>
                <XAxis dataKey="nhhk" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="dtbhk"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="dtbtlhk"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          {/* Bảng Điểm */}
          <TabsContent value="table">
            <div className="grid grid-cols-4 gap-4">
              {scoreData.map((term) => (
                <Button
                  key={term.nhhk}
                  variant={
                    selectedTerm.nhhk === term.nhhk ? "default" : "outline"
                  }
                  className="h-auto py-2 px-3 flex flex-col items-start"
                  onClick={() => handleTermClick(term)}
                >
                  <span className="font-bold">{term.nhhk}</span>
                  <span className="text-sm">
                    {term.dtbhk !== null ? term.dtbhk.toFixed(2) : "N/A"}
                  </span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Chi tiết học kỳ {selectedTerm.nhhk}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">ĐTBHK (hệ 4)</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">
                  {selectedTerm.dtbhk !== null
                    ? selectedTerm.dtbhk.toFixed(2)
                    : "N/A"}
                </span>
                {selectedTerm.stt > 1 &&
                  selectedTerm.dtbhk !== null &&
                  getPerformanceIcon(
                    selectedTerm.dtbhk,
                    scoreData[selectedTerm.stt - 2].dtbhk ?? 0
                  )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">ĐTBTLHK (hệ 4)</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">
                  {selectedTerm.dtbtlhk.toFixed(2)}
                </span>
                {selectedTerm.stt > 1 &&
                  getPerformanceIcon(
                    selectedTerm.dtbtlhk,
                    scoreData[selectedTerm.stt - 2].dtbtlhk
                  )}
              </div>
            </div>
          </div>
        </div>

        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-2 h-2 bg-yellow-500 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  opacity: 1,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  opacity: 0,
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            ))}
          </motion.div>
        )}

        <div className="mt-6 flex justify-center">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            <Award className="mr-1" />
            Xếp loại:{" "}
            {selectedTerm.dtbtlhk >= 3.6
              ? "Xuất sắc"
              : selectedTerm.dtbtlhk >= 3.2
              ? "Giỏi"
              : selectedTerm.dtbtlhk >= 2.5
              ? "Khá"
              : selectedTerm.dtbtlhk >= 2
              ? "Trung bình"
              : "Yếu"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
export default ScoresDashboard;

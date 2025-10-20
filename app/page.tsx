"use client";

import { useState } from "react";
import Feedback from "./components/feedback";
import Header from "./components/header";

interface SciProblem {
  problem_text: string;
  final_answer: string;
}

export default function Home() {
  const [problem, setProblem] = useState<SciProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateProblem = async () => {
    setIsLoading(true);
    setProblem(null);
    setFeedback("");
    setUserAnswer("");
    setIsCorrect(null);

    try {
      const res = await fetch("/api/science-problem", {
        method: "POST",
      });
      const data = await res.json();
      // The final_answer value should not be returned.
      setProblem({ problem_text: data.problem_text, final_answer: '' });
      setSessionId(data.sessionId);
    } catch (error) {
      console.error("Failed to generate problem", error);
      setFeedback("Failed to load a new problem. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback("");
    setIsCorrect(null);

    try {
      const res = await fetch("/api/science-problem/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, userAnswer }),
      });
      const data = await res.json();
      setFeedback(data.feedback);
      setIsCorrect(data.isCorrectAnswer);
    } catch (error) {
      console.error("Failed to submit answer", error);
      setFeedback("Failed to submit your answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Header title={"Science Problem Generator"} />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <button
            onClick={generateProblem}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            {isLoading ? "Generating..." : "Generate New Problem"}
          </button>
        </div>

        {problem && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Problem:
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              {problem.problem_text}
            </p>

            <form onSubmit={submitAnswer} className="space-y-4">
              <div>
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Answer:
                </label>
                <input
                  type="input"
                  id="answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  placeholder="Enter your answer"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!userAnswer || isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Submit Answer
              </button>
            </form>
          </div>
        )}

        <Feedback feedback={feedback} isCorrect={isCorrect} />
      </main>
    </div>
  );
}

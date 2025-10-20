"use client";

import React, { Component } from "react";

interface FeedbackProps {
  feedback: string;
  isCorrect: boolean | null;
}

export default class Feedback extends Component<FeedbackProps> {

  render() {
    const { feedback, isCorrect } = this.props;

    return (
      <>
        {feedback && (
          <div
            className={`rounded-lg shadow-lg p-6 ${isCorrect
              ? "bg-green-50 border-2 border-green-200"
              : "bg-yellow-50 border-2 border-yellow-200"
              }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {isCorrect ? "✅ Correct!" : "❌ Not quite right"}
            </h2>
            <p className="text-gray-800 leading-relaxed">{feedback}</p>
          </div>
        )}
      </>
    );
  }
}

import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch("http://localhost:4000/questions");
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        console.error("Failed to fetch questions");
      }
    }

    fetchQuestions();
  }, []);

  async function handleDeleteQuestion(id) {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } else {
      console.error("Failed to delete question");
    }
  }

  async function handleUpdateQuestion(id, newCorrectIndex) {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    });

    if (response.ok) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) => {
          if (question.id === id) {
            return { ...question, correctIndex: newCorrectIndex };
          }
          return question;
        })
      );
    } else {
      console.error("Failed to update question");
    }
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
            onUpdate={handleUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

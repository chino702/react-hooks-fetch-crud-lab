import React, { useState } from "react";

function QuestionForm() {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: "0",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      if (name.startsWith("answers")) {
        const index = parseInt(name.slice(-1));
        const updatedAnswers = [...prevFormData.answers];
        updatedAnswers[index] = value;
        return {
          ...prevFormData,
          answers: updatedAnswers,
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: formData.answers.filter((answer) => answer !== ""),
        correctIndex: parseInt(formData.correctIndex),
      }),
    });

    if (response.ok) {
      const newQuestion = await response.json();
      // Update the UI or state with the new question
      // For example, you can display a success message or navigate to the list of questions
    } else {
      console.error("Failed to create a new question");
    }
  }

  const dropdownValue = formData.correctIndex.toString();

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answers[0]"
            value={formData.answers[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answers[1]"
            value={formData.answers[1]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answers[2]"
            value={formData.answers[2]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answers[3]"
            value={formData.answers[3]}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={dropdownValue}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index.toString()}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

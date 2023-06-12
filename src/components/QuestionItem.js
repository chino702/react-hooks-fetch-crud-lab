import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedOption, setSelectedOption] = useState(correctIndex.toString()); // Add selectedOption state

  const options = answers.map((answer, index) => (
    <option key={index} value={index.toString()}>
      {answer}
    </option>
  ));

  function handleDelete() {
    onDelete(id);
  }

  function handleUpdate(event) {
    const newCorrectIndex = parseInt(event.target.value);
    setSelectedOption(event.target.value); // Update selectedOption state
    onUpdate(id, newCorrectIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedOption} onChange={handleUpdate}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
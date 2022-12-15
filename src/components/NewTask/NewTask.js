import useHttp from "../../hooks/useHtttp";
import { BASE_URL } from "../../utils/constants";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createdTask = (taskText, taskData) => {
    console.log(taskText, taskData.name);
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: `${BASE_URL}/tasks.json`,
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: taskText }),
      },
      createdTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {Header} from '../components/Header';
import {Task, TasksList} from '../components/TasksList';
import {TodoInput} from '../components/TodoInput';

export type EditNewTitle = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findName = tasks.find(task2 => task2.title === newTaskTitle);

    if (findName) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      );
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks(oldTask => [...oldTask, task]);
  }

  function handleToggleTaskDone(id: number) {
    const teste = tasks.map(tasksDone =>
      tasksDone.id == id
        ? {
            ...tasksDone,
            done: !tasksDone.done,
          }
        : tasksDone,
    );
    setTasks(teste);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {text: 'Não', style: 'cancel'},
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () =>
            setTasks(takss => takss.filter(removee => removee.id !== id)),
        }
        
      ],
    );
  }

  function handleEditTask({taskId, taskNewTitle}: EditNewTitle) {
    const teste = tasks.map(tasksDone =>
      tasksDone.id == taskId
        ? {
            ...tasksDone,
            title: taskNewTitle,
          }
        : tasksDone,
    );
    setTasks(teste);
 
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={t => handleAddTask(t)} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});

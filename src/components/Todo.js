import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Todo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  useEffect(() => {
    const subscriber = firestore()
      .collection('task')
      .onSnapshot(documentSnapshot => {
        let tempArray = [];
        documentSnapshot._docs.map(item => {
          const newtask = {
            id: item._data.id,
            title: item._data.title,
          };
          tempArray?.push(newtask);
          console.log(item);
        });
        setTasks([...tempArray]);

        console.log('User data: ', documentSnapshot);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [task]);

  const addTask = () => {
    if (task.trim() === '') return;
    firestore()
      .collection('task')
      .doc()
      .set({
        id: Date.now().toString(),
        title: task,
      })
      .then(() => {
        console.log('User added!');
        const newTask = {
          id: Date.now().toString(),
          title: task,
        };
        setTasks([...tasks, newTask]);
        setTask('');
      });
  };

  const removeTask = id => {
    firestore()
      .collection('task')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs[0].ref.delete();
        const updatednotes = tasks.filter(task => task.id !== id);
        setTasks(updatednotes);
      })
      .catch(e => e);
  };

  const startEditingTask = (id, title) => {
    setEditingTaskId(id);
    setEditedTaskTitle(title);
    console.log('id==>', id);
  };

  const finishEditingTask = () => {
    if (editingTaskId && editedTaskTitle.trim() !== '') {
      firestore()
        .collection('task')
        .where('id', '==', editingTaskId)
        .get()
        .then(querySnapshot => {
          querySnapshot.docs[0].ref.update({title: editedTaskTitle});
          console.log('User updated!');
          const updatedTasks = tasks.map(task =>
            task.id === editingTaskId
              ? {...task, title: editedTaskTitle}
              : task,
          );
          setTasks(updatedTasks);
          setEditingTaskId(null);
          setEditedTaskTitle('');
        });
    }
  };

  const renderTask = ({item}) => (
    <View
      style={[
        styles.taskContainer,
        item.completed ? styles.completedTask : null,
      ]}>
      {editingTaskId === item.id ? (
        <TextInput
          style={styles.editInput}
          value={editedTaskTitle}
          onChangeText={text => setEditedTaskTitle(text)}
          onBlur={finishEditingTask}
          autoFocus
        />
      ) : (
        <>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => startEditingTask(item.id)}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeTask(item.id)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={text => setTask(text)}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.taskList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  taskList: {
    flexGrow: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completedTask: {
    backgroundColor: '#f2f2f2',
  },
  taskTitle: {
    flex: 1,
  },
  removeText: {
    color: 'red',
    marginLeft: 8,
  },
  editButton: {
    paddingHorizontal: 8,
    marginRight: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  editButtonText: {
    color: '#333',
  },
  editInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

export default Todo;

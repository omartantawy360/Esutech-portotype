import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
  // Mock Data
  const [students, setStudents] = useState([
    { id: '1', name: 'Alice Johnson', grade: '10', clazz: 'A', competition: 'Math Olympiad', type: 'Individual', stage: 'Final', status: 'Approved', result: 'Passed' },
    { id: '2', name: 'Bob Smith', grade: '11', clazz: 'B', competition: 'Science Fair', type: 'Team', members: 'Bob, Eve', stage: 'Stage 1', status: 'Pending', result: '-' },
    { id: '3', name: 'Charlie Brown', grade: '9', clazz: 'C', competition: 'Coding Cup', type: 'Individual', stage: 'Qualifiers', status: 'Rejected', result: '-' },
    { id: '4', name: 'Diana Prince', grade: '12', clazz: 'A', competition: 'Debate Championship', type: 'Team', members: 'Diana, Bruce', stage: 'Final', status: 'Approved', result: 'Passed' },
    { id: '5', name: 'Evan Wright', grade: '10', clazz: 'B', competition: 'Math Olympiad', type: 'Individual', stage: 'Stage 2', status: 'Approved', result: '-' },
    { id: '6', name: 'Fiona Gallagher', grade: '11', clazz: 'A', competition: 'Science Fair', type: 'Individual', stage: 'Submission', status: 'Pending', result: '-' },
    { id: '7', name: 'George Miller', grade: '9', clazz: 'B', competition: 'Coding Cup', type: 'Individual', stage: 'Final', status: 'Approved', result: 'Failed' },
    { id: '8', name: 'Hannah Montana', grade: '12', clazz: 'C', competition: 'Debate Championship', type: 'Team', members: 'Hannah, Miley', stage: 'Round 2', status: 'Approved', result: '-' },
    { id: '9', name: 'Ian Somerhalder', grade: '10', clazz: 'A', competition: 'Math Olympiad', type: 'Individual', stage: 'Stage 1', status: 'Pending', result: '-' },
    { id: '10', name: 'Jack Daniels', grade: '11', clazz: 'B', competition: 'Science Fair', type: 'Team', members: 'Jack, Jill', stage: 'Final', status: 'Approved', result: 'Passed' },
    { id: '11', name: 'Karen Page', grade: '12', clazz: 'A', competition: 'Coding Cup', type: 'Individual', stage: 'Qualifiers', status: 'Approved', result: '-' },
    { id: '12', name: 'Leo Messi', grade: '9', clazz: 'C', competition: 'Math Olympiad', type: 'Individual', stage: 'Registration', status: 'Pending', result: '-' },
  ]);

  const [competitions, setCompetitions] = useState([
    { id: 'c1', name: 'Math Olympiad', stages: ['Stage 1', 'Stage 2', 'Final'] },
    { id: 'c2', name: 'Science Fair', stages: ['Submission', 'Final'] },
    { id: 'c3', name: 'Coding Cup', stages: ['Qualifiers', 'Final'] },
    { id: 'c4', name: 'Debate Championship', stages: ['Round 1', 'Round 2', 'Final'] },
  ]);

  const addCompetition = (data) => {
      const newCompetition = {
          id: Math.random().toString(36).substr(2, 9),
          ...data
      };
      setCompetitions(prev => [...prev, newCompetition]);
  };

  const registerStudent = (data) => {
    const newStudent = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      stage: 'Registration',
      status: 'Pending',
      result: '-',
    };
    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudentStatus = (id, status) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const updateStudentStage = (id, stage) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, stage } : s));
  };

  const setStudentResult = (id, result) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, result } : s));
  };

  return (
    <AppContext.Provider value={{
      students,
      competitions,
      addCompetition,
      registerStudent,
      updateStudentStatus,
      updateStudentStage,
      setStudentResult
    }}>
      {children}
    </AppContext.Provider>
  );
};

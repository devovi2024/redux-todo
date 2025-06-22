import React from 'react';
import './People.css';
import { Link } from 'react-router-dom';

const peopleTasks = [
  { id: 1, name: 'Alice Johnson', image: 'https://i.pravatar.cc/48?img=1', task: 'Design UI/UX' },
  { id: 2, name: 'Bob Smith', image: 'https://i.pravatar.cc/48?img=2', task: 'Develop Backend APIs' },
  { id: 3, name: 'Charlie Lee', image: 'https://i.pravatar.cc/48?img=3', task: 'QA Testing & Automation' },
];

const articles = [
  { id: 1, title: 'React Basics', content: 'Learn the fundamentals of React components, state, and props.', link: '#' },
  { id: 2, title: 'State Management with Redux', content: 'Manage your application state effectively using Redux.', link: '#' },
];

function People() {
  return (
    <section >

      <div>
        <div>
        <div>
            <h1><Link to="/" className="back-link">🏠︎</Link></h1>
        </div>
        </div>
      </div>

      <div className="people-app-container">
              <div className="tasks-section">
        <h2 className="section-title">People Sharing Tasks</h2>
        <table className="tasks-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Name</th>
              <th>Person</th>
            </tr>
          </thead>
          <tbody>
            {peopleTasks.map((person, idx) => (
              <tr key={person.id} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td className="center">{idx + 1}</td>
                <td>{person.task}</td>
                <td className="person-cell">
                  <img src={person.image} alt={person.name} className="person-avatar" />
                  <span>{person.name}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>


    </section>
  );
}

export default People;

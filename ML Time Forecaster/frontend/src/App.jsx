import { useState } from 'react';
import img1 from "./Assets/Icon 7.svg"
import WorkerForm from "./WorkerForm"
import "./App.css";

const App = () => {
  const [answer, setAnswer] = useState({})
  const handleSetAnswer = (response) => {
    setAnswer(response)
    console.log(response)
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-item"></div>
        <div className="sidebar-item"></div>
        <div className="sidebar-item"></div>
        <div className="sidebar-item"></div>
        <div className="sidebar-item"></div>
        <div className="sidebar-large-item"></div>
        <div className="sidebar-item"></div>
        <div className="sidebar-item"></div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className='header-left'>
            <div className='profile-icon'></div>
            <h1 className="greeting">HI YORK & CO !</h1>
          </div>
          <span className="brand-title">aurigo elevate</span>
        </header>

        <div className="content-grid">
          <div className="left-column">
            <div className="content-card">
              <WorkerForm onResponse={handleSetAnswer} />
            </div>
          </div>

          <div className="center-column">
            <ul className="info-list">
              <li className="info-item">
                <span className="info-icon">✔️</span>
                <div>
                  <p className="info-text">Project start time:</p>
                  <p className="info-subtext">{new Date().toLocaleDateString()}</p>
                </div>
              </li>
              <li className="info-item">
                <span className="info-icon">✔️</span>
                <div>
                  <p className="info-text">Estimated project completion time:</p>
                  <p className="info-subtext"> {answer && answer.estimatedTime ? answer.estimatedTime : ""}</p>
                </div>
              </li>
            </ul>
            <div className="image-center">
              <img
                src={img1}
                alt="blueprint"
                className="image-medium"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

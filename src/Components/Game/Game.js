import React, { useState, useReducer } from 'react';
import './Game.scss';
import TeamSelector from '../TeamSelector/TeamSelector';
import TimeLine from '../TimeLine/TimeLine';

import Reducer from '../../State/Reducer';
import InitialState from '../../State/State';

import MyModal from '../Modal/Modal';

import Interupts from '../../Data/Interupts';

function init(initalState) {
  return initalState;
}

function Game() {
  const [state, dispatch] = useReducer(Reducer, InitialState, init);

  const teamMax = 99;
  const [teamCount, setTeamCount] = useState(teamMax);
  const [teamCost, setTeamCost] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalCopy, setModalCopy] = useState('');

  const addMember = (type, member, cost) => {
    let r = teamCount - 1;
    if (r < 0) {
      return;
    }

    dispatch({
      type: 'updateTeamMember',
      payload: {
        team: type,
        role: member.type,
        amnt: 1,
        cost: cost
      }
    });

    dispatch({
      type: 'updateDays',
      payload: {
        team: type
      }
    });

    calcRemainingPeople(-1);
    calcTeamCost('add', member.cost);
  };

  const removeMember = (type, member, cost) => {
    dispatch({
      type: 'updateTeamMember',
      payload: {
        team: type,
        role: member.type,
        amnt: -1,
        cost: cost
      }
    });

    dispatch({
      type: 'updateDays',
      payload: {
        team: type
      }
    });

    calcRemainingPeople(1);
    calcTeamCost('delete', member.cost);
  };

  const calcRemainingPeople = c => {
    let r = teamCount + c;

    if (r >= 0 && r <= teamMax) {
      setTeamCount(r);
    }
  };

  const calcTeamCost = (type, cost) => {
    let newCost = teamCost;
    if (type === 'add') {
      newCost += cost;
    }
    if (type === 'delete') {
      newCost -= cost;
    }
    setTeamCost(newCost);
  };

  const renderTeams = () => {
    return state.teams.map(team => {
      const workLoad = state.project.workLoad[team.id.toLowerCase()];
      const teamData = state.current.teams.find(
        currentTeam => currentTeam.id === team.id
      );
      return (
        <div className="team" key={team.id} style={{ background: team.color }}>
          <TeamSelector
            label={team.name}
            type={team.id}
            team={team.teamProfile}
            teamData={teamData}
            addMember={addMember}
            removeMember={removeMember}
            workLoad={workLoad}
          ></TeamSelector>
        </div>
      );
    });
  };

  const startPhase = () => {
    if (state.current.active) {
      return;
    }

    const checkStart = canStart();

    //set project Stats state
    dispatch({
      type: 'setCurrentData',
      payload: checkStart
    });

    const currentDay =
      state.current.currentDay !== null ? state.current.currentDay : 0;

    checkPhase(currentDay);

    if (!checkStart.hasTime) {
      alert('make sure you have at least one person in each team!');
    }

    if (checkStart.totalDays > state.project.length) {
      alert('Project is going to overrun - please update staff to fix this!');
    }
  };

  const checkPhase = currentDay => {
    let dayCount = 0;

    //loop through teams
    for (let team of state.current.teams) {
      if (team.days != 0) {
        dayCount += team.days;
        if (currentDay < dayCount) {
          dispatch({
            type: 'setPhase',
            payload: {
              team: team.id.toLowerCase(),
              currentDay
            }
          });
          break;
        }
      }
    }
  };

  const canStart = () => {
    let totalDays = 0;
    let hasTime = true;

    for (var team of state.current.teams) {
      //exclude cs
      if (team.id.toLowerCase() !== 'cs') {
        totalDays += team.days;
        if (team.days === 0) {
          hasTime = false;
        }
      }
    }

    let goodToGo = false;
    if (totalDays <= state.project.length && hasTime) {
      goodToGo = true;
    }

    return {
      goodToGo,
      totalDays,
      hasTime
    };
  };

  const nextDay = () => {
    if (state.current.active) {
      const day = state.current.currentDay + 1;

      checkPhase(day);

      dispatch({
        type: 'nextDay',
        payload: { day }
      });

      if (checkInterupt()) {
        showInterupt();
      }

      if (day === state.current.totalDays) {
        alert('congratulations - you have delivered the project on time');
      }
    } else {
      alert('make sure the project isnt due to overrun.');
    }
  };

  const checkInterupt = () => {
    const chanceOfInterupt = state.project.client.fussiness / 5;
    const rand = Math.floor(Math.random() * 100);
    if (rand <= chanceOfInterupt) {
      return true;
    }
    return false;
  };

  const showInterupt = () => {
    const team = state.current.phases.find(team => team.active === true).id;

    const interupt = chooseInterupt(team);

    dispatch({
      type: 'setInterupt',
      payload: {
        interupt: interupt
      }
    });

    setShowModal(true);
  };

  const chooseInterupt = team => {
    const interupt =
      Interupts[team][Math.floor(Math.random() * Interupts[team].length)];
    return interupt;
  };

  const updateEstimate = (type, amnt) => {
    dispatch({
      type: 'updateEstimate',
      payload: {
        team: type,
        amnt: amnt
      }
    });

    dispatch({
      type: 'updateDays',
      payload: {
        team: type
      }
    });

    setTimeout(() => {
      const checkStart = canStart();
      dispatch({
        type: 'setCurrentData',
        payload: checkStart
      });
    }, 1);
  };

  const checkProjectLength = () => {
    console.log(state.project.length);
    console.log(state.current.totalDays);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const setClientHappiness = amnt => {
    dispatch({
      type: 'setClientHappiness',
      payload: {
        amnt
      }
    });
  };

  const setProjectLength = amnt => {
    dispatch({
      type: 'setProjectLength',
      payload: {
        amnt
      }
    });
  };

  const renderDebug = () => {
    return state.current.phases.map(team => {
      return (
        <dl key={team.id}>
          <dt>
            <h3>{team.id}</h3>
          </dt>
          <dt>Active</dt>
          <dd>{team.active ? 'true' : 'false'}</dd>
          <dt>Days completed</dt>
          <dd>{team.daysCompleted} </dd>
          <dd>
            <button
              onClick={() => {
                updateEstimate(team.id, 10);
              }}
            >
              Estimate +10
            </button>
          </dd>
          <dd>
            <button
              onClick={() => {
                updateEstimate(team.id, -10);
              }}
            >
              Estimate -10
            </button>
          </dd>
        </dl>
      );
    });
  };

  const processResult = result => {
    const csTeam = state.current.teams.find(team => (team.id = 'CS')).count;
    const csPerc = ((csTeam.senior * 7 + csTeam.junior * 5) / 25) * 50;

    const clientHappiness = state.current.clientHappiness / 2;

    const csScore = csPerc + clientHappiness;
    console.log('client score is:' + csScore);

    if (result.type === 'increaseEstimate') {
      updateEstimate(result.team, result.amnt);

      //check total days
      //if over project length then

      closeModal();
    } else if (result.type === 'increaseEstimateAndPLength') {
      let msg = '';

      if (csScore > 20) {
        msg =
          'Client accepts increase but is slightly unhappy with increase in project length';
        setClientHappiness(-20);
        setProjectLength(result.projectLength);
        updateEstimate(result.team, result.amnt);
      } else {
        msg = 'This isnt good enough, the project is cancelled!';
        gameOver();
      }

      alert(msg);
      closeModal();

      //updateProjectLength(result.projectLength)

      //check total days
      //if over project length then

      closeModal();
    } else if (result.type == 'refuseClient') {
      //check client services and client fussiness

      let msg = 'Client is sick of the team, the project is cancelled!';

      if (csScore > 80) {
        msg = 'Client accepts refusal but is slightly unhappy';
        //client happiness - 20
        setClientHappiness(-20);
      } else if (csScore > 50) {
        msg = 'Client accepts refusal but is a bit more unhappy';
        //client happiness - 20
        setClientHappiness(-20);
      } else if (csScore > 30) {
        msg = 'Client accepts refusal but is very unhappy';
        //client happiness - 50
        setClientHappiness(-50);
      } else {
        msg = 'This isnt good enough, the project is cancelled!';
        gameOver();
      }
      alert(msg);
      closeModal();
    }
  };

  const gameOver = () => {
    alert('gameover');
  };

  return (
    <div className="game ">
      <h1>Total Project Management</h1>
      <div className="work section">
        <h2>Research the project</h2>
        <div className="work-item">
          <h3>Project </h3>
          <dl>
            <dt>Client</dt>
            <dd>Imaginary Inc.</dd>
            <dt>Project length</dt>
            <dd>{state.project.length} days</dd>
            <dt>Budget</dt>
            <dd>{state.project.budget}</dd>
            <dt>Client Fussiness</dt>
            <dd>{state.project.client.fussiness}</dd>
          </dl>
        </div>
        <div className="work-item">
          <h3>Estimates</h3>
          <dl>
            <dt>User Experience</dt>
            <dd>{state.project.workLoad.ux}</dd>
            <dt>Visual Design</dt>
            <dd>{state.project.workLoad.vd}</dd>
            <dt>Engineering</dt>
            <dd>{state.project.workLoad.e}</dd>
          </dl>
        </div>
      </div>

      <div className="people section">
        <h2>Choose your starting team</h2>
        {/*<h3>Team members left: {teamCount}</h3>*/}
        <div className="teams">{renderTeams()}</div>
        <br />
        <h3>
          Budget: {state.project.budget} | Cost: {teamCost} | Profit:
          {Math.floor(100 - (teamCost / state.project.budget) * 100)}%
        </h3>
      </div>

      <div className="timeline section">
        <h2>Timeline</h2>
        <TimeLine
          projectLength={state.project.length}
          teams={state.current.teams}
          currentDay={state.current.currentDay}
        ></TimeLine>
      </div>

      <div className="debug section">
        <h2>Debug</h2>
        {renderDebug()}
        <dl>
          <dt>
            <h3>Stats</h3>
          </dt>

          <dt>Active</dt>
          <dd>{state.current.active ? 'true' : 'false'}</dd>
          <dt>Current Time</dt>
          <dd>End of day {state.current.currentDay}</dd>
          <dt>Total days</dt>
          <dd>{state.current.totalDays}</dd>
          <dt>Client happiness</dt>
          <dd>{state.current.clientHappiness}</dd>
        </dl>
      </div>

      <div className="start">
        <button onClick={startPhase}>Start</button>
        <button onClick={nextDay}>Next day</button>
      </div>

      <MyModal
        show={showModal}
        heading={'Decision time...'}
        interupt={state.current.interupt}
        onRequestClose={closeModal}
        processResult={processResult}
      />
    </div>
  );
}

export default Game;

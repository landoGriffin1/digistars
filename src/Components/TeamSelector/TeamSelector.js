import React, { useEffect, useState } from 'react';
import './TeamSelector.scss';

import { FaUserAlt } from 'react-icons/fa';
import { FiPlus, FiMinus } from 'react-icons/fi';

function TeamSelector(props) {
  const [totalCost, setTotalCost] = useState(0);
  const [totalProd, setTotalProd] = useState(0);

  useEffect(() => {}, [props]);

  const addMember = type => {
    const newCost = totalCost + type.cost;

    const newTotalProd = totalProd + type.productivity;

    updateValues(newTotalProd, newCost);

    props.addMember(props.type, type, newCost);
  };

  const removeMember = type => {
    const currentCount = props.teamData.count[type.type];
    if (currentCount == 0) {
      return;
    }

    const newCost = totalCost - type.cost;
    const newTotalProd = totalProd - type.productivity;

    updateValues(newTotalProd, newCost);

    props.removeMember(props.type, type, newCost);
  };

  const updateValues = (newTotalProd, newCost) => {
    setTotalCost(newCost);
    if (props.workLoad) {
      setTotalProd(newTotalProd);
    }
  };

  const renderTypes = () => {
    let types = props.team.map(type => {
      return (
        <div className="type" key={type.type}>
          <p className="label">
            <strong>{type.type}</strong>
            <br />
            Cost: {type.cost} |
            {type.productivity
              ? ` Productivity: ${type.productivity} units per day`
              : ` Experience: ${type.experience} years`}
          </p>
          <div className="row">
            <button
              className="remove"
              onClick={() => {
                removeMember(type);
              }}
            >
              <FiMinus />
            </button>
            <ul>{renderTeam(props.teamData.count[type.type])}</ul>
            <button
              className="add"
              onClick={() => {
                addMember(type);
              }}
            >
              <FiPlus />
            </button>
          </div>
        </div>
      );
    });

    return types;
  };

  const renderTeam = count => {
    let team = [];
    for (let i = 0; i < count; i++) {
      team.push(
        <li key={i}>
          <FaUserAlt />
        </li>
      );
    }

    return team;
  };

  return (
    <div className="team_selector">
      <h3 className="h6 header">{props.label}</h3>

      <div className="types">
        {renderTypes()}
        <br />
        <h6>Total Prod per day: {totalProd}</h6>
        <h6>Total Cost: {totalCost}</h6>
        <h6>Days to do work: {props.teamData.days}</h6>
        <br />
      </div>
    </div>
  );
}

export default TeamSelector;

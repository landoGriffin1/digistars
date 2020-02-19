import React, { useEffect, useState } from 'react';
import './TimeLine.scss';

function TimeLine(props) {
  const [totalDays, setTotalDays] = useState();
  const [projectLength, setProjectLength] = useState();

  const getWidth = type => {
    const team = props.teams.find(team => team.id === type);
    let width;
    if (isFinite(team.days)) {
      width = (team.days / totalDays) * 100 + '%';
    } else {
      width = 0;
    }
    return width;
  };

  useEffect(() => {
    let days = 0;
    for (var i = 0; i < props.teams.length; i++) {
      days += props.teams[i].days;
    }

    setProjectLength(days);

    if (days < props.projectLength) {
      days = props.projectLength;
    }

    //console.log(days);

    setTotalDays(days);
  }, [props]);

  const renderDays = () => {
    const dayWidth = 100 / totalDays;
    const days = [];
    for (var i = 0; i < totalDays; i++) {
      days.push(
        <span
          key={i}
          style={{
            width: dayWidth + '%'
          }}
          className={`${
            i === props.currentDay && i < projectLength ? 'current' : ''
          }`}
        >
          {i}
        </span>
      );
    }
    days.push(
      <span key={'last'} className="last" style={{ width: dayWidth + '%' }}>
        {totalDays}
      </span>
    );
    return days;
  };

  return (
    <div className="times">
      <div className="days">{renderDays()}</div>
      <div className="bars">
        <div className="ux" style={{ width: getWidth('UX') }}>
          <span className="label">UX</span>
        </div>
        <div className="vd" style={{ width: getWidth('VD') }}>
          <span className="label">VD</span>
        </div>
        <div className="eng" style={{ width: getWidth('E') }}>
          <span className="label">E</span>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;

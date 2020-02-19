const Reducer = (state, action) => {
  let newCurrentTeams;
  switch (action.type) {
    case 'updateTeamMember':
      newCurrentTeams = state.current.teams.map(team => {
        if (team.id === action.payload.team) {
          team.count[action.payload.role] =
            team.count[action.payload.role] + action.payload.amnt;
          team.cost = action.payload.cost;
        }
        return team;
      });

      return {
        ...state,
        current: {
          ...state.current,
          teams: newCurrentTeams
        }
      };

    case 'updateEstimate':
      const newProjectWorkLoad =
        state.project.workLoad[action.payload.team] + action.payload.amnt;
      if (newProjectWorkLoad >= 0) {
        return {
          ...state,
          project: {
            ...state.project,
            workLoad: {
              ...state.project.workLoad,
              [action.payload.team]: newProjectWorkLoad
            }
          }
        };
      }
      return state;

    case 'updateDays':
      newCurrentTeams = state.current.teams.map(team => {
        if (team.id.toLowerCase() === action.payload.team.toLowerCase()) {
          const workLoad = state.project.workLoad[team.id.toLowerCase()];

          const teamProfile = state.teams.find(t => t.id === team.id)
            .teamProfile;

          let totalProd = 0;
          for (var t of teamProfile) {
            const count = team.count[t.type];
            totalProd += t.productivity * count;
          }
          let days = 0;
          if (totalProd > 0) {
            days = Math.ceil(workLoad / totalProd);
          }

          team.days = days;
        }
        return team;
      });

      return {
        ...state,
        current: {
          ...state.current,
          teams: newCurrentTeams
        }
      };

    case 'setCurrentData':
      //const newPhases = Object.assign({}, state.current.phases);

      /*for (var team of state.current.teams) {
        newPhases[team.id.toLowerCase()].daysCompleted = team.days;
      }*/

      return {
        ...state,
        current: {
          ...state.current,
          //phases: newPhases,
          totalDays: action.payload.totalDays,
          active: action.payload.goodToGo
        }
      };
    case 'nextDay':
      return {
        ...state,
        current: {
          ...state.current,
          currentDay: action.payload.day
        }
      };
    case 'setPhase':
      let newArr = JSON.parse(JSON.stringify(state.current.phases));

      const team = newArr.map(team =>
        team.id === action.payload.team
          ? (team.active = true)
          : (team.active = false)
      );

      return {
        ...state,
        current: {
          ...state.current,
          currentDay: action.payload.currentDay,
          phases: newArr
        }
      };
    case 'setInterupt':
      return {
        ...state,
        current: {
          ...state.current,
          interupt: action.payload.interupt
        }
      };
    case 'setClientHappiness':
      const newHappiness = state.current.clientHappiness + action.payload.amnt;
      return {
        ...state,
        current: {
          ...state.current,
          clientHappiness: newHappiness
        }
      };
    case 'setProjectLength':
      const newPLength = state.project.length + action.payload.amnt;
      return {
        ...state,
        project: {
          ...state.project,
          length: newPLength
        }
      };
    default:
      throw new Error();
  }
};

export default Reducer;

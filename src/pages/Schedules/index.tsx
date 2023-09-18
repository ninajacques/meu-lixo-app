import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import schedulesData from '../../assets/schedules.json';
import React from "react";

const Schedules = () => {
  const { user, isLoading } = useAuth();

  const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  const selectiveSchedule = schedulesData?.find(data => data.type === 'seletiva')?.schedules;
  const commomSchedule = schedulesData?.find(data => data.type === 'comum')?.schedules;

  return isLoading ? <></> : (
    <C.Container>
      {(user?.address || user?.city) && (
        <C.Title>{`${user.address}, ${user.city}`}</C.Title>
      )}
      {selectiveSchedule?.length && (
        <C.ScheduleSection>
          <h2>Coleta Seletiva</h2>
          {selectiveSchedule.map(selective => (
            <C.ScheduleItem key={`selective_${selective.day}_${selective.hour}`}>
              <span>{days[selective.day]}</span>
              <span>{selective.hour}</span>
            </C.ScheduleItem>
          ))}
        </C.ScheduleSection>
      )}
      {commomSchedule?.length && (
        <C.ScheduleSection>
        <h2>Coleta Comum</h2>
        {commomSchedule.map(commom => (
            <C.ScheduleItem key={`commom_${commom.day}_${commom.hour}`}>
              <span>{days[commom.day]}</span>
              <span>{commom.hour}</span>
            </C.ScheduleItem>
          ))}
      </C.ScheduleSection>
      )}
    </C.Container>
  );
};

export default Schedules;
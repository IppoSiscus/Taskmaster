import React, { useContext, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { TaskContext } from '../contexts/TaskContext';
import { ProjectContext } from '../contexts/ProjectContext';
import { AppContext } from '../contexts/AppContext';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage: React.FC = () => {
    const taskContext = useContext(TaskContext);
    const projectContext = useContext(ProjectContext);
    const appContext = useContext(AppContext);

    if (!taskContext || !projectContext || !appContext) {
        return <div>Loading...</div>;
    }

    const { updateTask } = taskContext;
    const { openQuickAddModal } = appContext;

    const events = useMemo(() => {
        if (!taskContext) return [];
        return taskContext.tasks
            .filter(task => task.dueDate)
            .map(task => ({
                id: task.id, // Add task id to the event
                title: task.title,
                start: task.dueDate,
                end: task.dueDate, // Assuming tasks are single-day events for now
                allDay: true,
                resource: { projectId: task.projectId },
            }));
    }, [taskContext]);

    const eventStyleGetter = (event: any) => {
        const project = projectContext?.projects.find(p => p.id === event.resource.projectId);
        const style = {
            backgroundColor: project?.color || '#64748b',
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return { style };
    };

    const handleEventDrop = ({ event, start }: any) => {
        updateTask(event.id, { dueDate: start });
    };

    const handleSelectSlot = ({ start }: { start: Date }) => {
        openQuickAddModal(start);
    };

    return (
        <div className="h-[calc(100vh-10rem)]">
            <h1 className="text-3xl font-bold mb-4">Calendario</h1>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                onEventDrop={handleEventDrop}
                onSelectSlot={handleSelectSlot}
                selectable
            />
        </div>
    );
};

export default CalendarPage;

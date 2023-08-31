import React, { useState, useEffect } from 'react';
import { Calendar, Modal, Button, Input, Select } from 'antd';

const ScheduleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventType, setEventType] = useState('Event'); 
  const [eventText, setEventText] = useState('');
  const [reminderText, setReminderText] = useState('');
  const [scheduleData, setScheduleData] = useState([]);


  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEventText('');
    setReminderText('');
  };

  const handleSave = () => {
    if (eventType === 'Event') {
      const newEvent = {
        date: selectedDate.format('YYYY-MM-DD'),
        type: 'Event',
        text: eventText,
      };
      const updatedScheduleData = [...scheduleData, newEvent];
      setScheduleData(updatedScheduleData);
      sessionStorage.setItem('scheduleData', JSON.stringify(updatedScheduleData));
    } else {
      const newReminder = {
        date: selectedDate.format('YYYY-MM-DD'),
        type: 'Reminder',
        text: reminderText,
      };
      const updatedScheduleData = [...scheduleData, newReminder];
      setScheduleData(updatedScheduleData);
      sessionStorage.setItem('scheduleData', JSON.stringify(updatedScheduleData));
    }
  
    handleModalCancel();
  };
  

  const dateCellRender = (value) => {
    const date = value.format('YYYY-MM-DD');
    const eventsAndReminders = scheduleData.filter((item) => item.date === date);

    return (
      <div>
        {eventsAndReminders.map((item, index) => (
          <div
            key={index}
            className={`saved-date-cell ${item.type === 'Event' ? 'event' : 'reminder'}`}
          >
            {item.type === 'Event' ? item.text : `Reminder at ${item.text}`}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Calendar onSelect={handleDateClick} dateCellRender={dateCellRender} />
      <Modal
        title="Add Event or Reminder"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Select
          defaultValue="Event"
          style={{ width: '100%' }}
          onChange={(value) => setEventType(value)}
        >
          <Select.Option value="Event">Event</Select.Option>
          <Select.Option value="Reminder">Reminder</Select.Option>
        </Select>
        {eventType === 'Event' ? (
          <Input
            placeholder="Event description"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
          />
        ) : (
          <Input
            placeholder="Reminder description"
            value={reminderText}
            onChange={(e) => setReminderText(e.target.value)}
          />
        )}
      </Modal>
      <style>
        {`
          .saved-date-cell {
            width: auto;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2px;
            border-radius: 5px;
            padding: 4px;
            color: white;
          }
          
          .event {
            background-color: blue;
          }
          
          .reminder {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
};

export default ScheduleCalendar;

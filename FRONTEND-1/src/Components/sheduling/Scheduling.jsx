import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './scheduling.css'; 

const localizer = momentLocalizer(moment);

const Scheduling = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editEventData, setEditEventData] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);  

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        const data = response.data;
        const formattedEvents = data.map((event) => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
          eventTime: moment(event.time, "HH:mm").format("hh:mm A"),
          eventDate: moment(event.date).format("MMMM Do YYYY"),
        }));
        setEvents(formattedEvents);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  
  const handleSelectSlot = ({ start, end }) => {
    setEditEventData({ title: "", time: "", start, end });
    setShowEventModal(true);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEventData({ ...editEventData, [name]: value });
  };

  
  const handleEventSubmit = async () => {
    const { title, time, start, _id } = editEventData;
    if (!title || !time) {
      alert("Please fill in both event title and time.");
      return;
    }
  
    const newEvent = {
      title,
      date: start,
      time,
    };
  
    try {
      if (_id) {
       
        await axios.put(`http://localhost:5000/api/events/${_id}`, newEvent);
      } else {
        
        await axios.post("http://localhost:5000/api/events", newEvent);
      }
  
      setShowEventModal(false);
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event. Please try again.");
    }
  };

 
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setDeleteSuccess(true); 
      setShowEventModal(false); 
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event. Please try again.");
    }
  };

  const handleSelectEvent = (event) => {
    setEditEventData({ ...event });
    setShowEventModal(true);
  };

  
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      const data = response.data;
      const formattedEvents = data.map((event) => ({
        ...event,
        start: new Date(event.date),
        end: new Date(event.date),
        eventTime: moment(event.time, "HH:mm").format("hh:mm A"),
        eventDate: moment(event.date).format("MMMM Do YYYY"),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="scheduling-container">
      <div className="popup-wrapper">
        {showEventModal && (
          <div className="popup">
            <h3>{editEventData._id ? "Edit Event" : "Create Event"}</h3>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={editEventData.title}
              onChange={handleInputChange}
            />
            <input
              type="time"
              name="time"
              value={editEventData.time}
              onChange={handleInputChange}
            />
            <button className="save-event" onClick={handleEventSubmit}>
              Save Event
            </button>
            <button className="cancel" onClick={() => setShowEventModal(false)}>
              Cancel
            </button>

            {editEventData._id && (
              <button
                className="delete-event"
                onClick={() => handleDeleteEvent(editEventData._id)}
              >
                Delete Event
              </button>
            )}
          </div>
        )}
      </div>

   
      {deleteSuccess && (
        <div className="success-message">
          <p>Event deleted successfully!</p>
          <button onClick={() => setDeleteSuccess(false)} className="close-button">
            Close
          </button>
        </div>
      )}

      <div className="calendar-container">
        {isLoading ? (
          <div className="loading">Loading events...</div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            style={{ height: 500 }}
          />
        )}
      </div>
    </div>
  );
};

export default Scheduling;

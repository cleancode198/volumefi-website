import React, { useMemo } from "react";

import { convertDateStringWithWeekDay } from "utils/date";
import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.MIXPANEL_API_KEY)



const UpcomingEvent = ({ data }) => {
  const eventLink = useMemo(() => {
    const link = {
      register: "",
      learnMore: "",
    };

    if ("RegistrationLink" in data.content) {
      link.register = data.content.RegistrationLink.url;
    }

    if ("LearnMore" in data.content) {
      link.learnMore = data.content.LearnMore.url;
    }

    return link;
  }, [data]);

  const openRegistration = () => {
    console.log('click');

    mixpanel.track('REGISTER_EVENT', eventLink.register);
    window.location = eventLink.register;
  }

  return (
    <div className="event-item-container">
      <div className="event-image-wrapper">
        <img src={data.content.Image.filename} className="event-image" />
      </div>
      <div className="event-section">
        <div className="event-date">
          {convertDateStringWithWeekDay(data.content.EventTime, true)}
        </div>
        <div className="event-title">{data.content.Title}</div>
        <div className="event-spacer"></div>
        <div className="event-description">{data.content.Description}</div>
        <div className="event-buttons">
          {eventLink.register !== "" && (
            <a
              href={eventLink.register}
              className="event-register"
              target="_blank"
            >
              Register
            </a>
          )}
          {eventLink.learnMore !== "" && (
            <a
              onClick={(e) => openRegistration()}
              className="event-register"
              target="_blank"
            >
              Learn More
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;

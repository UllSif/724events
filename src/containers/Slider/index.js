import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Trie le tableau data par date en ordre décroissant.
  // sort fait une comparaison basée sur les dates
  // -1 indique que si evtA est plus ancien que evtB, il doit être placé avant evtB

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);

    return () => clearInterval(interval);
  }, [index, byDateDesc]);

  return (
      <div className="SlideCardList">
        {byDateDesc?.map((event, idx) => (
          <div key={event.title + event.date}>
            <div
                className={`SlideCard SlideCard--${
                    index === idx ? "display" : "hide"
                }`}
            >
              <img src={event.cover} alt="forum" />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div>{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => (
                    <input
                        key={_.date + _.title}
                        type="radio"
                        readOnly
                        name="radio-button"
                        checked={index === radioIdx}
                    />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default Slider;

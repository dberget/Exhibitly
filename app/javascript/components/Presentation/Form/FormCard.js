import React from 'react';

const FormCard = ({ card, style, format, canMove, handleDoubleClick }) => {

  const MinimalCard = () => {
    return (
      <div className="card" style={style} onDoubleClick={handleDoubleClick}>
        <div className="card-header">
          <div className="row">
            <div className="ml-1">
              {card.title}
            </div>
            <span className="ml-auto">
              {card.tags.map(x => <span className="badge badge-pill badge-secondary mr-1"> {x} </span>)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const FullCard = () => {
    return (
      <div className="card" style={style} onDoubleClick={handleDoubleClick}>
        <div className="card-header">
          {card.title}
        </div>
        <div className="card-body">
          <p className="card-subtitle">
            {card.body}
          </p>
        </div>
        <div className="card-footer mt-5">
          <div className="row">
            <div className="ml-1">
              Industry
            </div>
            <span className="ml-auto">
              {card.tags.map(x => <span className="badge badge-pill badge-secondary mr-1"> {x} </span>)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    format ?
      <FullCard /> :
      <MinimalCard />
  )
};

export default FormCard;

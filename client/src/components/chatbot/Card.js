import React from "react";

const Card = props => {
  return (
    <div style={{ height: 270, paddingRight: 30, width: 270, float: "left" }}>
      <div className="card">
        {/* <div className="card-image" style={{ width: 240 }}>
          <img
            alt={props.payload.fields.header.stringValue}
            src={props.payload.fields.image.stringValue}
          />
        </div> */}
        <span className="card-title">
          {/* {props.payload.fields.header.stringValue} */}
          <a target="_blank" href={props.payload.fields.url.stringValue}>
            {props.payload.fields.header.stringValue}
          </a>
        </span>
        <div className="card-content">
          {props.payload.fields.discription.stringValue}
          <p>
            <a>{props.payload.fields.price.stringValue}</a>
          </p>
        </div>
        <div className="card-action">
          <a target="_blank" href={props.payload.fields.link.stringValue}>
            HOW TO GET THERE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

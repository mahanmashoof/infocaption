import "./Card.css";

const Card = (props) => {
  return (
    <div className="card-main">
      <div className="title">{props.name}</div>
      <div className="date">{props.publicationDate}</div>
      <div className="content">{props.content}</div>
      <div className="author">By: {props.firstLastName}</div>
    </div>
  );
};

export default Card;

const Card = (props) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.publicationDate}</div>
      <div>{props.content}</div>
      <div>By: {props.firstLastName}</div>
      <br />
    </div>
  );
};

export default Card;

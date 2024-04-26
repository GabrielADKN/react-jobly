import { useNavigate } from "react-router-dom";

const CompanyCard = ({ handle, name, description, numEmployees }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/companies/${handle}`);
  };

  const generateInitials = (name) => {
    const hyphenSplit = name.split('-');

    const words = hyphenSplit.flatMap(word => word.split(' '));

    const initials = words.map(word => word.charAt(0));

    return initials.join('. ');
};

const colorfulTitle = generateInitials(name).split(".").map((char, index) => (
  <span key={index} style={{ color: getRandomColor() }}>{char}</span>
));

  return (
    <div className="card" style={{ width: '25rem' }}>
        <div className="card-img-top d-flex justify-content-center align-items-center" style={{ height: '200px', backgroundColor: '#f0f0f0', fontSize: '2rem' }}>
            {colorfulTitle}
        </div>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{numEmployees} employees</p>
            <p className="card-text overflow-auto" style={{ maxHeight: '50px', textAlign: 'justify' }}>{description}</p>
            <button className="btn btn-primary" onClick={handleClick}>See Jobs</button>
        </div>
    </div>
);

};

export default CompanyCard;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export { getRandomColor };
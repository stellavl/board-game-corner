import { Col, Image } from 'react-bootstrap';
import BoardGameDetails from '../common/BoardGameDetails';

const BoardGameImageAndDetails = ({ boardGame }) => {
    return (
        <Col md={6}>
            <Image 
                src={boardGame.image} 
                alt={boardGame.name} 
                fluid 
                className="mb-3 w-90" 
            />
            <div className="d-flex justify-content-center mb-3" style={{ color: "var(--color-gray-purple)" }}> 
                <BoardGameDetails boardGame={boardGame} />
            </div>
        </Col>
    );
};

export default BoardGameImageAndDetails;

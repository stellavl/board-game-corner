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
            <div className="justify-content-center align-items-center" style={{ color: "var(--color-gray-purple)" }}> 
                {/* Apply the new class here */}
                <BoardGameDetails boardGame={boardGame} />
            </div>
        </Col>
    );
};

export default BoardGameImageAndDetails;

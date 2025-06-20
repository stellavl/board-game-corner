import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CitiesCards from  '../components/common/CitiesCards'
import CafeSelectBar from '../components/common/CafeSelectBar';
import axiosInstance from '../config/axiosConfig';

const BoardGameCafesPage = () => {
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllCafes = async () => {
            try {
                const res = await axiosInstance.get('/api/board-game-cafes/all');
                setCafes(res.data);
            } catch (err) {
                setCafes([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAllCafes();
    }, []);

    return (
        <Container className='d-flex flex-column justify-content-center align-items-center mt-5 w-75'>
            <Row className='mb-3'>
                <Col>
                    <h2 className='text-center fw-bold' style={{ color: 'var(--color-orange)'}}>
                    Παιχνιδοκαφέ
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CafeSelectBar boardGameCafes={cafes} loading={loading} />
                </Col>      
            </Row>
            <CitiesCards text="Διάλεξε πόλη:" cafes={cafes} loading={loading} />
        </Container>
    );
};

export default BoardGameCafesPage;
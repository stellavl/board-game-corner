import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Container, Pagination } from 'react-bootstrap';
import BoardGameSelectBar from "../common/BoardGameSelectBar";

const ITEMS_PER_PAGE = 8;

const BoardGameGroup = ({ title, widthSize="100%", boardGames }) => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const filteredGames = boardGames.filter(game =>
        game.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleGames = filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleSearch = (selectedGame) => {
        setSearchText(selectedGame ? selectedGame.label : '');
        setCurrentPage(1);
    };

    const handleCardClick = (gameName) => {
        navigate(`/boardgames/${gameName}`);
    };

    return (
        <Container className="p-4 my-3" style={{ 
            width: widthSize,
            border: '2px solid var(--color-orange)', 
            borderRadius: '12px', 
            backgroundColor: 'var(--color-soft-yellow)', 
            textAlign: 'center'
        }}>
            <h4 className="text-[var(--color-orange)] font-semibold text-sm mb-3">{title}</h4>
            
            <BoardGameSelectBar isSearchButtonVisible={false} onGameSelect={handleSearch} boardGames={boardGames}/>

            <Row className="mt-4">
                {visibleGames.map(game => (
                    <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-2">
                        <Card 
                            className="h-100 shadow-sm" 
                            style={{ borderColor: 'var(--color-orange)', width: '100%', cursor: 'pointer' }}
                            onClick={() => handleCardClick(game.name)}
                        >
                            <Card.Img variant="top" src={game.image} alt={game.name} style={{ height: '80px', objectFit: 'cover' }} />
                            <Card.Body className="p-1">
                                <Card.Title className="text-[var(--color-orange)] text-xs">{game.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-2 text-xs">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                    {[...Array(totalPages).keys()].map(number => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => setCurrentPage(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
                </Pagination>
            )}
        </Container>
    );
};

export default BoardGameGroup;

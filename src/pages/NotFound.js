import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container>
      <Row className=" mt-5 justify-content-center">
        <Col xs={12} md={6}>
          <div className="text-center">
            <img src="https://media.istockphoto.com/id/1343867706/vector/concept-design-of-an-empty-state-on-a-web-page-error-404-page-not-found-something-went-wrong.jpg?s=612x612&w=0&k=20&c=hfcP7UgFzAhC8Pu6KlNREhfrz2n5lQ8_bWDKWD-ut2c=" alt="404"/>
            <p>Go back to the <Link to="/">homepage</Link></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
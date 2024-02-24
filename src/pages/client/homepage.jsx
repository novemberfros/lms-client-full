import { useSelector } from "react-redux";
import ClientLayout from "../../components/layouts/clientLayout";
import LibraryCarousel from "../../components/libraryCarousel";
import { Col, Container, Row, Form } from "react-bootstrap";
import BookCard from "../../components/bookCard";

const Homepage = () => {
  const { books } = useSelector(state => state.book)

  return ( 
    <ClientLayout>
      <div className="m-2">
        <LibraryCarousel />
      </div>

      <Container>
      <div className="p-4">
              {/* ToDo by students */}
        <Form.Control type="text" placeholder="Search Book By Name" /> Number of Books
      </div>

        <Row>
          {books.map(book => <Col xs={3} key={book._id} className="my-2"><BookCard book={book} /></Col>)}
        </Row>
      </Container>
    </ClientLayout>
   );
}
 
export default Homepage;
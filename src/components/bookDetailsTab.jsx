import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const BookDetailsTab = (props) => {
  const { description } = props

  return (
    <Tabs
      defaultActiveKey="description"
      id="book-details-tab"
      className="mb-3"
    >
      <Tab eventKey="description" title="Description">
        {description}
      </Tab>
      <Tab eventKey="reviews" title="Reviews">
        Tab content for Reviews
      </Tab>
    </Tabs>
  );
}

export default BookDetailsTab;
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";

const BoatSearch = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ rows: [] });

  const runSearch = (event) => {
    event.preventDefault();
    fetch("/api/search?search=" + search)
      .then((response) => response.json())
      .then((data) => setResults({ rows: data }));
  };

  const nbRows = 10;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Find Boat
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Find a boat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          To sign on, you'll need to find a boat to sign on to.
          <Form className="mt-2">
            <Form.Group>
              <Form.Control
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="mb-2"
                placeholder="Name, Sail number, Contact"
              ></Form.Control>
              <Button variant="primary" onClick={(event) => runSearch(event)}>
                Search
              </Button>

              <DataGrid style={{height: "300px"}}
                {...results}
                columns={[
                  {
                    field: "boatName",
                    headerName: "Name",
                    width: 150,
                    headerClassName: "bg-light",
                  },
                  {
                    field: "sailNumber",
                    headerName: "Sail Number",
                    width: 150,
                    headerClassName: "bg-light",
                  },
                ]}
                rows={results.rows}
                hideFooterPagination
                hideFooterSelectedRowCount
                hideFooter
                slots={{
                  columnHeaders: () => null,
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sign on
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoatSearch;

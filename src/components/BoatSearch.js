import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const BoatSearch = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ rows: [] });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const runSearch = (event) => {
    event.preventDefault();
    fetch("/api/search?search=" + search)
      .then((response) => response.json())
      .then((data) => setResults({ rows: data }));
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const resultList = results.rows.map((result, index) => (
    <ListItemButton
      selected={selectedIndex === index}
      onClick={(event) => handleListItemClick(event, index)}
    >
      <ListItemIcon>
        <ListItemIcon>
          {selectedIndex === index ? (
            <CheckCircleIcon></CheckCircleIcon>
          ) : (
            <RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>
          )}
        </ListItemIcon>
      </ListItemIcon>
      <ListItemText primary={`${result.boatName} ${result.sailNumber}`} />
    </ListItemButton>
  ));

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

              <List
                component="nav"
                aria-label="main mailbox folders"
                className="rounded border"
                sx={{
                  width: "100%",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 300,
                  "& ul": { padding: 0 },
                }}
              >
                {resultList}
              </List>
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

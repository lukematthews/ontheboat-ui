import { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBoat } from "../features/selectedBoatSlice";
import { Search } from "@mui/icons-material";

const BoatSearch = (props) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const selectedBoat = useSelector((state) => state.selectedBoat);

  const handleClose = (event) => {
    console.log("event: " + event);
    setShow(false);
    if (event) {
      let boat = results.rows[selectedIndex];
      dispatch(setSelectedBoat(Object.assign({}, boat)));
    } else {
      dispatch(setSelectedBoat({}));
    }
  };
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ rows: [] });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const runSearch = (event) => {
    if (!search) {
      setResults({ rows: [] });
      return;
    }
    event.preventDefault();
    fetch("/api/marina/search?search=" + search)
      .then((response) => response.json())
      .then((data) => setResults({ rows: data }));
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const resultList = results.rows.map((result, index) => (
    <ListItemButton
      key={result.id}
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

  const button = () => {
    if (props.var === "button") {
      return (
        <Button variant="primary" onClick={handleShow}>
          Find Boat
        </Button>
      );
    } else {
      return <a onClick={handleShow} href="#" style={{fontSize: "12px"}}>Change boat</a>
    }
  };
  return (
    <>
      {button()}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Find a boat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          To sign on, you'll need to find a boat to sign on to.
          <Form
            className="mt-2"
            onSubmit={(e) => {
              runSearch(e);
            }}
          >
            <Form.Group>
              <InputGroup>
                <Form.Control
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="mb-2"
                  placeholder="Name, Sail number, Contact"
                  autoFocus
                ></Form.Control>
                <div className="input-group-append">
                  <Button onClick={(e) => runSearch(e)}>
                    <Search></Search>
                  </Button>
                </div>
              </InputGroup>
              <List
                component="nav"
                aria-label="main mailbox folders"
                className="rounded border"
                sx={{
                  width: "100%",
                  height: 300,
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
          <Button variant="secondary" onClick={(e) => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleClose(e)}>
            Sign on
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoatSearch;

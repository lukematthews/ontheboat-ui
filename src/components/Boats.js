import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "@mui/icons-material";
import BoatDetailDialog from "./BoatDetailDialog";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBoatRegister } from "../features/boatRegisterSlice";

const Boats = () => {
  const dispatch = useDispatch();
  const selectedBoat = useSelector((state) => state.boatRegisterSelectedBoat);

  const [page, setPage] = useState({
    page: { page: 0, pageSize: 10 },
    pageSize: 10,
    totalElements: 0,
    totalPages: 1,
    numberOfElements: 0,
    rowCount: 0,
    content: [],
  });
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    const response = await fetch(
      `/api/marina/search-page?search=${search}&page=${paginationModel.page}&size=${paginationModel.pageSize}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to call API");
      })
      .then((response) => updatePage(response));
  };
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const doSearch = async () => {
    const response = await fetch(
      `/api/marina/search-page?search=${search}&page=${paginationModel.page}&size=${paginationModel.pageSize}`
    );
    const data = await response.json();
    updatePage(data);
  };

  const updatePage = (data) => {
    let newPage = { ...data };
    newPage.page = { page: data.number, pageSize: data.size };
    newPage.last = data.last;
    newPage.totalPages = data.totalPages;
    newPage.totalElements = data.totalElements;
    newPage.content = data.content;
    newPage.rowCount = data.totalElements;
    setPage(newPage);
  };

  useEffect(() => {
    fetchData(page);
  }, [paginationModel]);

  const selectionChanged = (boat) => {
    dispatch(
      setSelectedBoatRegister({ ...page.content.find((row) => row.id == boat) })
    );
  };

  return (
    <Row>
      <Col>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            doSearch();
          }}
        >
          <InputGroup>
            <Form.Control
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="mb-2"
              placeholder="Name, Sail number, Design, Contact"
              autoFocus
            ></Form.Control>
            <div className="input-group-append">
              <Button onClick={(e) => doSearch()}>
                <Search></Search>
              </Button>
            </div>
          </InputGroup>
        </Form>

        <div style={{ width: "100%", height: "400px" }}>
          <DataGrid
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
              {
                field: "design",
                headerName: "Design",
                width: 150,
                headerClassName: "bg-light",
              },
              {
                field: "contact",
                headerName: "Contact",
                width: 150,
                headerClassName: "bg-light",
              },
            ]}
            pageSizeOptions={[5, 10, 20, 100]}
            rowCount={page.rowCount}
            rows={page.content}
            onPaginationModelChange={setPaginationModel}
            paginationModel={paginationModel}
            paginationMode="server"
            onRowSelectionModelChange={(data) => selectionChanged(data)}
          />
        </div>
        <BoatDetailDialog boat={selectedBoat.value}></BoatDetailDialog>
      </Col>
    </Row>
  );
};

export default Boats;

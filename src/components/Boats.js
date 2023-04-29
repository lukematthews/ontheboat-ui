import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import BoatDetail from "./BoatDetail";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import BoatDetailModal from "./BoatDetail";
import { Search } from "@mui/icons-material";

const Boats = () => {
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
  const [selectedBoat, setSelectedBoat] = useState({});
  const fetchData = async () => {
    const response = await fetch(
      `/api/boats?page=${paginationModel.page}&size=${paginationModel.pageSize}`
    );
    const data = await response.json();
    updatePage(data);
  };
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const doSearch = async () => {
    const response = await fetch(
      `/api/search-page?search=${search}&page=${paginationModel.page}&size=${paginationModel.pageSize}`
    );
    const data = await response.json();
    updatePage(data);
  }

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
    setSelectedBoat({...page.content.find((row) => row.id == boat)});
  };

  return (
    <Row>
      <Col>
        <InputGroup>
        <Form.Control
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="mb-2"
                placeholder="Name, Sail number, Contact"
              ></Form.Control>
              <div className="input-group-append">
                <Button onClick={(e) => doSearch()}><Search></Search></Button>
              </div>
        </InputGroup>

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
        <BoatDetail boat={selectedBoat}></BoatDetail>
      </Col>
    </Row>
  );
};

export default Boats;

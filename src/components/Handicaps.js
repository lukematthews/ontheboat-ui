import { Table } from "react-bootstrap";

const Handicaps = (props) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Rating</th>
            <th>Cert #</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {props.handicaps.map((handicap) => {
            return (
              <tr key={`handicap-${handicap.id}`} id={handicap.id}>
                <td>{handicap.type}</td>
                <td>{handicap.rating}</td>
                <td>{handicap.certificate}</td>
                <td>{handicap.expiryDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Handicaps;

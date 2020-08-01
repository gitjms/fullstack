/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import PatientPage from "../PatientPage/index";
import { useStateValue, addPatient } from "../state";

interface Props {
  listvisible: boolean;
  setlistvisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientListPage: React.FC<Props> = ({ listvisible, setlistvisible }: Props) => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const hideOrShow = { display: listvisible ? '' : 'none' };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch(addPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3 style={hideOrShow}>Patient list</h3>
      </Container>
      <Table celled style={hideOrShow}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient | undefined) => (
            <Table.Row key={patient?.id}>
            {patient &&
              <Table.Cell>
                <Link to={`/patients/${patient.id}`}
                  onClick={() => setlistvisible(false)}
                >
                  {patient?.name}
                </Link>
              </Table.Cell>}
              <Table.Cell>{patient?.gender}</Table.Cell>
              <Table.Cell>{patient?.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()} style={hideOrShow}>Add New Patient</Button>

      <Switch>
        <Route path={'/patients/:id'}><PatientPage {...{ listvisible }}/></Route>
      </Switch>
    </div>
  );
};

export default PatientListPage;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon, Card, Button } from "semantic-ui-react";
import { Patient, NewEntry, EntryType } from "../types";
import { toPatient } from "../utils";
import { useStateValue, updatePatient } from "../state";
import { InvalidPatientError } from "../helpers/errorHelper";
import { apiBaseUrl } from '../constants';
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const genderIconProps = {
  male: { name: "mars" as const, color: "blue" as const },
  female: { name: "venus" as const, color: "pink" as const },
  other: { name: "genderless" as const, color: "grey" as const },
};

interface Props {
  listvisible: boolean;
}

const PatientPage: React.FC<Props> = ({ listvisible }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const hideOrShow = { display: listvisible ? 'none' : '' };
  let patient = patients[id];

  try {
    patient = toPatient({ ...patient });
  } catch (e) {
    if (e instanceof InvalidPatientError && !fetchStatus.current.hasFetched) {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
    } else {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
        fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
      } catch (e) {
        console.error(e);
      }
    };

    if (fetchStatus.current.shouldFetch) {
      void fetchPatient();
    }
  }, [id, dispatch]);

  if (!patient) return null;

  const submitNewEntry = async (values: NewEntry) => {
    const body = { ...values };

    if (body.type === EntryType.OccupationalHealthCare) {
      if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
        body.sickLeave = undefined;
      }
    }

    try {
      if (patient) {
        const { data: returnedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          body
        );
        dispatch(updatePatient(returnedPatient));
        closeModal();
      }
    } catch (e) {
      console.error(e.response?.data);

      let errorMessage = "Oops! Something went wrong!";

      if (e.response?.status >= 400 && e.response?.status < 500) {
        errorMessage = e.response.data.error;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="PatientPage" style={hideOrShow}>
      <Container>
        <h1>
          {patient.name} <Icon {...genderIconProps[patient.gender]} />
        </h1>

        <p>
          <strong>SSN:</strong> {patient.ssn}
        </p>

        <p>
          <strong>Occupation:</strong> {patient.occupation}
        </p>

        {patient.entries ?
          <>
            {patient.entries.length > 0 && <h2>Entries</h2>}
            <Card.Group>
              {patient.entries.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} />
              ))}
            </Card.Group>
          </>
        : null}
      </Container>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
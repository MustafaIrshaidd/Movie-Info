import React from "react";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css"

const MovieCard = ({ movies }) => {
  const { id } = useParams();
  return (
    <>
    <div className={"container d-flex justify-content-center align-items-center "+styles["h-100-custom"]}>
        <MDBCard style={{ maxWidth: '700px' }}>
      <MDBRow className='g-0'>
        <MDBCol md='5'>
          <MDBCardImage className="h-100" src={`https://image.tmdb.org/t/p/w500${movies.results[id].poster_path}`} alt='...' fluid />
        </MDBCol>
        <MDBCol md='7'>
          <MDBCardBody>
            <MDBCardTitle>{movies.results[id].title}</MDBCardTitle>
            <MDBCardText>
            {movies.results[id].overview}
            </MDBCardText>
            <MDBCardText>
              <small className='text-muted'>{movies.results[id].release_date}</small>
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>

    </div>
       
    </>
  );
};

export default MovieCard;

import React,{useState} from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBRipple,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Movies = ({ movies }) => {
  
  return (
    <>
      <div className="container my-5">
        <h1 className="m-auto text-center mb-4">Movies</h1>
        <div className="row justify-content-center">
          {movies.results.map((movie, index) => {
            return (
              <>
                <MDBCard className="col-md-3 col-sm-4 px-1 py-1 mx-1 my-1">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      fluid
                      alt="..."
                    />
                    <Link to={`/movie-card/${index}`}>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </Link>
                  </MDBRipple>
                </MDBCard>
              </>
            );
          })}
        </div>
        <nav aria-label="..." className="d-flex justify-content-center my-5">
        <MDBPagination size="lg" className="mb-0">
          <MDBPaginationItem className="page-item  active" aria-current="page">
            <MDBPaginationLink tag="span" className="page-link">
              1<span className="visually-hidden">(current)</span>
            </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
        </nav>
      </div>

      
    </>
  );
};

export default Movies;

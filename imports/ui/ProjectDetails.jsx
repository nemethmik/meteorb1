/* @flow */
import * as React from "react"
export const ProjectDetails = (props/*:{match:{params:{id:number|string}}}*/) => {
  const id = props.match.params.id
  return (
  <div className="container section project-details">
    <div className="card z-depth-0">
      <div className="card-content">
        <span className="card-title">Project Title - {id}</span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum officia recusandae temporibus amet assumenda culpa itaque vel fuga asperiores quos? Quas at nesciunt laudantium aliquid tempora voluptatibus atque, rerum nulla!</p>
      </div>
      <div className="card-action grey lighten-4 grey-text">
        <div>Posted by Jim Wenham</div>
        <div>Dec 6, 2019 08:00</div>
      </div>
    </div>
  </div>  
)}

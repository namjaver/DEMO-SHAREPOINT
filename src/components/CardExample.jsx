import React from "react";

export default function CardExample() {
  return (
    <div className="card w-64 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://placehold.co/300x200/png"
          alt="Example"
          className="rounded-t-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">DaisyUI Card</h2>
        <p>This is a simple card example using DaisyUI.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Action</button>
        </div>
      </div>
    </div>
  );
}

function Detail({ setToggleDetail, toggleDetail, selectedQuake }) {
  function handleToggle() {
    setToggleDetail(!toggleDetail)
  }

  return (
    <div className="detailArea">
      <div className="header">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            handleToggle()
          }}
        >
          X
        </button>
      </div>
      <div className="content">
        <h3>
          {selectedQuake.place}- {selectedQuake.city}
        </h3>
        <hr />
        <p>
          {selectedQuake.date} - {selectedQuake.time}
        </p>
        <hr />
        <p>Magnitude = {selectedQuake.magnitude}</p>
        <hr />
        <p>
          Depth = <b>{selectedQuake.depth}</b>
        </p>
        <hr />
      </div>
    </div>
  )
}

export default Detail

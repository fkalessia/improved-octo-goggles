import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import axios from 'axios'
import { nanoid } from 'nanoid'

import Loading from '../Loading'
import Sidebar from '../Sidebar'
import Detail from '../Detail'
import Faults from '../Faults'

function Map() {
  // States
  const [quakes, setQuakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Filters
  const [selectedQuake, setselectedQuake] = useState('')
  const [toggleDetail, setToggleDetail] = useState(false)
  const [toggleFaults, setToggleFaults] = useState(false)
  const [count, setCount] = useState(100)
  const [minMagnitude, setMinMagnitude] = useState(0)
  const [maxMagnitude, setMaxMagnitude] = useState(10)

  useEffect(() => {
    axios
      .get('https://rocky-reaches-53467.herokuapp.com')
      .then((res) => {
        setQuakes(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(true)
        setErrorMessage(err.message)
      })
  }, [])

  function getColor(mag) {
    if (mag < 2) {
      return 'orange'
    } else if (mag < 4) {
      return 'red'
    } else if (mag < 6) {
      return 'brown'
    } else if (mag < 8) {
      return 'black'
    }
  }

  return (
    <>
      <div className="row" style={{ height: '92%' }}>
        <Sidebar
          toggleFaults={toggleFaults}
          setToggleFaults={setToggleFaults}
          setCount={setCount}
          minMagnitude={minMagnitude}
          setMinMagnitude={setMinMagnitude}
          maxMagnitude={maxMagnitude}
          setMaxMagnitude={setMaxMagnitude}
        />

        <div className="col-md-12 map">
          {loading && <Loading error={error} errorMessage={errorMessage} />}

          {!loading && (
            <MapContainer center={[39, 35]} zoom={6}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {toggleFaults && <Faults />}

              {quakes
                .slice(0, count)
                .filter(
                  (quake) =>
                    quake.magnitude >= minMagnitude &&
                    quake.magnitude <= maxMagnitude
                )
                // Map to markers
                .map((quake) => {
                  return (
                    <CircleMarker
                      key={nanoid()}
                      center={[quake.latitude, quake.longitude]}
                      pathOptions={{ color: getColor(quake.magnitude) }}
                      radius={quake.magnitude * 5}
                      eventHandlers={{
                        click: (e) => {
                          setselectedQuake(quake)
                          setToggleDetail(true)
                        }
                      }}
                    ></CircleMarker>
                  )
                })}
            </MapContainer>
          )}
        </div>
        {toggleDetail && (
          <Detail
            toggleDetail={toggleDetail}
            setToggleDetail={setToggleDetail}
            selectedQuake={selectedQuake}
          />
        )}
      </div>
    </>
  )
}

export default Map

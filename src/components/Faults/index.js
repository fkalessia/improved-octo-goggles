import { useState, useEffect } from 'react'
import { GeoJSON } from 'react-leaflet'
import faults from './faults.json'
import { nanoid } from 'nanoid'
function Faults() {
  const [faultsData, setFaultsData] = useState([])

  useEffect(() => {
    setFaultsData(faults.features)
  }, [])
  return (
    <>
      {faultsData.map((fault) => (
        <GeoJSON key={nanoid()} data={fault} />
      ))}
    </>
  )
}

export default Faults

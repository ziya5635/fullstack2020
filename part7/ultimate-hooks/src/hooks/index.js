import { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  useEffect(() => {
  	axios.get(baseUrl)
  	.then(res => setResources(res.data))
  	.catch(err => console.log(err.message))
  },[baseUrl])

  const create = async resource => {
  	try{
  		const res = await axios.post(baseUrl, resource)
  		setResources(() => resources.concat(res.data))
    	return res.data
  	}catch(err){
  		console.log(err.message)
  		return null
  	}
  }

  const update = async (id, newObject) => {
  	try{
  		const res = await axios.put(`${baseUrl}/${id}`, newObject)
  		setResources(() => resources.concat(res.data))
  		return res.data
  	}catch(err){
  		console.log(err.message)
  		return null
  	}
  	
  }

  const service = {
    create,
    update
  }

  return [
    resources, service
  ]
}
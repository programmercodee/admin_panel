//ths is used in backend.
//'npm i axios' first install this package.
// process.env.REACT_APP_API_URL 
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,//Include your API key in the Authorization
        'Content-Type': 'application/json' //Ajust the content type as needed
      },

      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const data = await response.json();
      return (data)
    } else {
      const errorData = await response.json()
      return errorData
    }

  } catch (error) {
    console.log(error)
  }
}

export const fetchDataFromApi = async (url) => {
  try {

    const params = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,//Include your API key in the Authorization
        'Content-Type': 'application/json' //Ajust the content type as needed
      },
    }

    const { data } = await axios.get(apiUrl + url, params)
    return data

  } catch (error) {
    console.log(error)
    return error
  }
}

//for user avatar only
export const uploadImage = async (url, updateData) => {

  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,//Include your API key in the Authorization
      'Content-Type': 'multipart/form-data' //Ajust the content type as needed
    },
  }

  var response;
  await axios.put(apiUrl + url, updateData, params).then((res) => {
    response = res
  })
  return response;
}


export const editData = async (url, updateData) => {

  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,//Include your API key in the Authorization
      'Content-Type': 'application/json' //Ajust the content type as needed
    },
  }

  var response;
  await axios.put(apiUrl + url, updateData, params).then((res) => {
    response = res
  })
  return response;
}

//category image uplaod and sub cat 
export const uploadImages = async (url, formData) => {

  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,//Include your API key in the Authorization
      'Content-Type': 'multipart/form-data' //Ajust the content type as needed
    },
  }

  var response;
  await axios.post(apiUrl + url, formData, params).then((res) => {
    response = res
  })
  return response;
}


export const deleteImages = async (url, image) => {
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,//Include your API key in the Authorization
      'Content-Type': 'application/json' //Ajust the content type as needed
    },
  }

  const { res } = await axios.delete(apiUrl + url, image, params)
  return res
}


export const deleteData = async (url) => {
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,//Include your API key in the Authorization
      'Content-Type': 'application/json' //Ajust the content type as needed
    },
  }

  const { res } = await axios.delete(apiUrl + url, params)
  return res
}
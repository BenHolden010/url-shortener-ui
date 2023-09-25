import React, { useState, useEffect } from 'react';
import './App.css';
import { deleteUrls, getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('')
  getUrls()
  .then(data=>{
    setError('')
    if(data.message){
      setError(data.message)
      return
    }
    setUrls(data.urls)
  })
  .catch(err=>{
    console.log(err.message)
    setError(err.message)
  })
  },[])

  function addUrl(newUrl){
    setError('')
    postUrls(newUrl)
    .then(data=>{
      setError('')
      if(data.message){
        setError(data.message)
        return
      }
      setUrls([...urls, data])
    })
    .catch(err=>{
      setError(err.message)
    })
  }

  function deleteUrl(id){
    setError('')
    deleteUrls(id)
    .then(res=>{
      setError('')
      if(res.message){
        setError(res.message)
        return
      }
      const filteredUrls = urls.filter(url=>url.id!==id)
      setUrls(filteredUrls)
    })
    .catch(err=>{
      setError(err.message)
    })
  }

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <div className='error'>
          <p>{error}</p>
        </div>
        <UrlForm addUrl={addUrl} setError={setError}/>
      </header>
      <UrlContainer urls={urls} deleteUrl={deleteUrl}/>
    </main>
  );
}

export default App;

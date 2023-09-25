import React, { useState, useEffect } from 'react';
import './App.css';
import { deleteUrls, getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
  getUrls()
  .then(data=>{
    console.log(data)
    setUrls(data.urls)
  })
  },[])

  function addUrl(newUrl){
    postUrls(newUrl)
    .then(data=>{
      console.log(data)
      setUrls([...urls, data])
    })
  }

  function deleteUrl(id){
    deleteUrls(id)
    .then(res=>{
      const filteredUrls = urls.filter(url=>url.id!==id)
      setUrls(filteredUrls)
    })
  }

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrl={addUrl}/>
      </header>
      <UrlContainer urls={urls} deleteUrl={deleteUrl}/>
    </main>
  );
}

export default App;

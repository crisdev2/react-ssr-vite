import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import { CustomPageContext, usePageContext } from '../renderer/usePageContext';

export { Page }

export const onBeforeRender = async (pageContext: CustomPageContext) => {
  let json;
  try {
    const q = pageContext.urlOriginal;
    const url = `https://raw.githubusercontent.com/crisdev2/react-ssr-vite/master/api/home.json?q=${q}`;
    const data = await fetch(url);
    console.log(url);
    json = await data.json();
    //console.log('data', json);
  } catch (err) {
    console.log(err);
  }
  //console.log('data1', json)
  return {
    pageContext: {
      //urlOriginal: '/hola'
      json
    }
  }
}


function Page() {

  const data = usePageContext();
  //console.log('Test', data.json)

  const [count, setCount] = useState(0);
  return (
    <>
      <h1>HOla</h1>
      <p>
        Demo using <code>vite-plugin-ssr</code> test.
      </p>
      <p>
        <Button>Hola</Button>.
      </p>
      <p>
        Count <button onClick={() => setCount(count+1)}>{count}</button>.
      </p>
    </>
  )
}

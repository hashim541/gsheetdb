

function App() {
  async function handleForm() {
    console.log('send');
    const options = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        hay:'hello'
      })
    }
  
    try {
      const response = await fetch('http://localhost:3000/user/register?hi=hello',options)
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  

  return (
    <button onClick={()=>handleForm()}>click</button>
  )
}

export default App

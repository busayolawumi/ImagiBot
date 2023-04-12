import React, { useState } from 'react'
import { Configuration, OpenAIApi} from 'openai'

const Hero = () => {

  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })

  const openai = new OpenAIApi(configuration)

  const generateImage = async() => {
    setLoading(true)

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false)
    setResult(response.data.data[0].url)
    console.log(response.data)
  }

  
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='font-bold text-3xl'>React AI Image Generator</h1>
      {loading ? (
        <h2>Image Generation in progress ... Please Wait</h2>
      ) : null}
      <div className='py-[20px] flex flex-col items-center'>
        <textarea className="text-input border border-black" placeholder="Enter a prompt" onChange={(e) => setPrompt(e.target.value)} rows="5" cols="50" />
        <br />
        <button className='max-w-[30%] bg-black border text-white border-black rounded-md py-[10px] px-[0.2px]' onClick={generateImage}>Generate Image</button>
        {(result.length > 0) ? (
          <img className='result-image' src={result} alt="Generated Image" />
        ):null
      }
      </div>
      <p className='text-xs text-gray-400'>
        Powered by OpenAI
      </p>
    </div>
  )
}

export default Hero
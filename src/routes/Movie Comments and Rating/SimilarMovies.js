import { useEffect, useState } from "react"

export default function SimilarMovies(props) {
    const id=props.id

    const [similarMovies, setSimilarMovies] = useState([])


    const getSimilarMovies = async () => {
      let api_key = "8cc8bb5915e1ce414955be2f44bcb790"
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=en-US&page=1`
      )
      let jsonData = await response.json()
      console.log(jsonData);
    //   setActorBio(jsonData)
    }
  
    useEffect(() => {
        getSimilarMovies()
    }, [similarMovies])
  

  return (
    <div>SimilarMovies</div>
  )
}

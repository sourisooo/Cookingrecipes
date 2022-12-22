import { useState, useEffect } from "react"

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    // invoke the function
    if (method === "GET") {
      fetchData()
    }
    if (method === "POST" && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }

  }, [url, method, options])

  return { data, isPending, error, postData }
}

//Commentaires
//La fonction usefetch est constitué de 4 objets utilisant la fonctionnalité usestate. Elle prend pour entrée
//une url et une méthode pour retourner un objet constitué de plusieurs attributs associés aux 4 objets utilisant
//la fonctionnalité usestate. La récupération des données sur la bdd JSON est réalisé à travers la fonctionnalité
//useEffect, fonctionnalité qui s'active lors q'une URL est accédée ou les variables method ou option sont modifiées.
//Le fetchage  est réalisé à travers plusieurs constantes qui vont stockées diverses fonctions JSON: fetch et .json.
//Lorsque ces 2 constantes ont été incrémentés (await précisant qu'il s'agit de donnée asynchrone), la méthode setData
//est utilisée pour actualiser la valeur de l'attribut data.
//La fonction postdata récupere une variable en entrée qui n'est rien d'autre que les datas issus de la fonction 
//create notemment  title, ingredients, method, cookingTime: cookingTime + ' minutes'. Cette fonction
//est invoquée lorsque la fonction create est exécutée. En s'éxécutant, la fonction postdata modifie l'état de la variable
// option de null vers /null/ et ,en passant la variable options /null/ et incrémente la variable options de toutes les informations
//nécessaires au fetchage:postdata, méthode POST et permet au programme d'executer fetchData(options).
// cad lorsque useEffect sera activé la fonction fetchData pourra récupérer la variable options comme entrée de sa fonction
// puis incorporer les options (comprenant la data) dans la demande de fetch cad que la méthode POST et ses datas seront
//exécuter avant la demande de fetch.
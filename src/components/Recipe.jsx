import React, { useState, useEffect, useRef } from 'react'
import useFetch from '../hooks/useFetch';
import '../components/recipe.css'
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner'
  ; <RotatingLines
    height="80"
    width="80"
    radius="9"
    color="red"
    ariaLabel="three-dots-loading"
    wrapperStyle
    wrapperClass
  />


const Recipe = () => {

  const [input, SetInput] = useState("");
  const [allergyInput, SetAllergyInput] = useState("");
  const [items, SetItems] = useState([]);
  const [blocks, SetBlocks] = useState([]);
  const [prompt, SetPrompt] = useState("")
  const [allFoods, SetAllFoods] = useState([])
  const answer = useFetch(prompt);



  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('inputItems'));
    if (savedItems) {
      console.log(savedItems, "savedItems")
      SetItems(savedItems)
    }
  }, [])

  useEffect(() => {
    if (answer) {
      SetAllFoods(answer)
    }
  }, [answer])


  const handleEnter = (e) => {

    if (e.key === "Enter") {
      const newItems = [...items, { id: items.length + 1, name: input }];

      if (newItems.length !== 0) {
        localStorage.setItem('inputItems', JSON.stringify(newItems));
        console.log(localStorage.getItem('inputItems'))
        SetItems(newItems)
      }


      SetInput("")
    }

  }

  const handleEnterallergyInput = (e) => {

    if (e.key === "Enter") {
      const newBlocks = [...blocks, { id: blocks.length + 1, name: allergyInput }];
      SetBlocks(newBlocks)
      SetAllergyInput("")
    }

  }

  const getCommaSeparatedNames = (elements) => {
    return elements.map(item => item.name).join(", ");
  };


  const handleGetData = () => {
    const allItems = getCommaSeparatedNames(items);
    const allBlockedItems = getCommaSeparatedNames(blocks);
    // const newPrompt = `Please suggest some recipes that include ingredients like ${allItems}. and should not include ${allBlockedItems}
    // Return the response as an array of objects with each object containing an "id" key for each dishes, "name" key
    // for the recipe/dish name and a "description" key for the recipe description. "imageUrl" key for the image of the recipe and a "tag" key for assigning the
    //  dish of its flavour. eg: sweet, spicy etc`;
    const newPrompt = `Please suggest some (minimum : 5 maximum :  9) recipes that include ingredients like ${allItems} and exclude ${allBlockedItems}. 

                        Please format the response as a JSON array of objects. Each object should contain the following keys:
                        - "id": a unique identifier for the dish (integer).
                        - "name": the name of the recipe or dish (string) (maximum 2 words).
                        - "description": one Liner brief description of the recipe or dish (string).
                        - "CookingProcess": an array of steps of the detailed process of how to make the recipe.
                        - "tag": a flavor tag for the dish, such as sweet, sour, salty, bitter, astringent, and spicy, etc. (string).

                        Ensure that the JSON array is well-formatted, with no extra whitespace or code block markers. For example:

                        [
                          {
                            "id": 1,
                            "name": "Recipe Name ",
                            "description": "Description of the recipe.",
                            "CookingProcess": "[take two bowls of maida,mix well, stir fry..]",
                            "tag": "flavor"
                          }
                        ]`
    console.log(newPrompt)


    SetPrompt(newPrompt)

  }

  const handleDeletePills = (id) => {

    const newItems = items.filter((i) => i.id !== id)
    SetItems(newItems);

  }
  const handleDeleteBlocks = (id) => {
    const newBlocks = blocks.filter((i) => i.id !== id)
    SetBlocks(newBlocks);

  }

  const handleReset = () => {
    // localStorage.removeItem("inputItems");
    // localStorage.removeItem("foods");
    localStorage.clear()
    SetAllFoods([])
    SetBlocks([]);
    SetItems([]);
    SetPrompt("")
    console.log("reset")

    console.log("inputItems after reset:", localStorage.getItem("inputItems")); // Should be null
    console.log("foods after reset:", localStorage.getItem("foods"));
  }


  return (
    <div  >


      <div className="row InputFields">
        <div className="col-6">
          <div className='ingredient'>

            <input
              id="ingredients"
              type="text"
              className="ingredient"
              value={input}
              onChange={(e) => { SetInput(e.target.value) }}
              onKeyDown={handleEnter}
              placeholder='Enter ingredients' />
            <div className='inputPills'>
              {items.map((i) => (
                <div key={i.id}>
                  <span onClick={(e) => { handleDeletePills(i.id) }}>{i.name} &times;</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className='allergy'>
            <input
              id="allergy"
              type="text"
              className="allergy"
              value={allergyInput}
              onChange={(e) => { SetAllergyInput(e.target.value) }}
              onKeyDown={handleEnterallergyInput}
              placeholder='Enter allergic items' />
            <div className='BlockedPills'>
              {blocks.map((i) => (
                <div key={i.id}>
                  <span onClick={(e) => { handleDeleteBlocks(i.id) }}>{i.name} &times;</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className='Buttons'>
            <button className='getData' onClick={handleGetData}>Get response</button>
            <button className='Reset' onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>

      <div className='loader'>
      {prompt && allFoods.length === 0 &&

        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="maroon"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      }
      </div>

      <div className="row foodRow">

        {allFoods && allFoods.map((foods, index) => (
          <div key={foods.id} className="col-3">
            <div className="cards">
              <div className="imagebox">
                <img src="https://img.freepik.com/free-vector/delicious-food-background_23-2147846305.jpg" alt="" />
              </div>
              <span className="tags">
                {foods.tag}
              </span>
              <p className='foodName'>{foods.name}</p>
              <p className='foodDescription'>{foods.description}</p>

              <Link to={`/foodieClub/details/${foods.id}`} state={{ Food: foods.name, CookingProcess: foods.CookingProcess }} className='DetailLink'>
                <button className='viewDetails'>View Details</button>
              </Link>
              {/* <button className='viewDetails'>View Details</button> */}
            </div>
          </div>
        ))}
      </div>





    </div>
  )
}

export default Recipe

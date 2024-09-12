import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import '../components/details.css'

const RecipeDetails = () => {
  const { id } = useParams();
  const location = useLocation(); // Get the state passed via Link
  const { Food, CookingProcess } = location.state || {};

  console.log(location.state)
  return (


    <div className="recipe-card">
      {Food && CookingProcess ? (
        <>
          <h1 className="recipe-title">{Food}</h1>
          <p><strong>Cooking Process:</strong></p>
          <div className="cooking-process">
            {CookingProcess.map((step, index) => (
              <div key={index} className="cooking-step">
                <span className="step-number">{index + 1}.</span> {step}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Recipe details are not available.</p>
      )}
    </div>

  )
}

export default RecipeDetails

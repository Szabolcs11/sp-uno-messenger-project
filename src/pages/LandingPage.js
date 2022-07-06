import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate()
    function RedirectToAuth () {
        navigate('/auth')
    }
    
    return (
        <div>
            <p>LandingPage</p>
            <button onClick={RedirectToAuth}>Start Game</button>
        </div>
    )
}

export default LandingPage
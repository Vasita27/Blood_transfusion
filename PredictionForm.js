// src/PredictionForm.js

import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
    const [recency, setRecency] = useState('');
    const [frequency, setFrequency] = useState('');
    const [monetary, setMonetary] = useState('');
    const [time, setTime] = useState('');
    const [result, setResult] = useState('');

    const handlePrediction = async () => {
        const data = [parseFloat(recency), parseFloat(frequency), parseFloat(monetary), parseFloat(time)]
        try {
           const response = await axios.post('http://localhost:5000/api/predict', {
            data});
            console.log("namaskaram")
            if(response.data.predictions[0].values[0][0]===0){
                setResult("Customer cannot donate blood.The chances are "+response.data.predictions[0].values[0][1][1]+" only")
            }
            else{
                setResult("Customer can donate blood.The chances are "+response.data.predictions[0].values[
                    0][1][1])
            }
            console.log(response.data.predictions[0].values[0][0])
        } catch (error) {
            console.error('Error fetching prediction:', error);
            setResult('Error fetching prediction.');
        }
    };
    
    return (
        <div>
            <h1>Real-Time Blood Donation Prediction</h1>
            <form onSubmit={(e) => { e.preventDefault(); handlePrediction(); }}>
                <label>
                    Recency (months since last donation):
                    <input type="number" value={recency} onChange={(e) => setRecency(e.target.value)} required />
                </label>
                <label>
                    Frequency (total donations):
                    <input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} required />
                </label>
                <label>
                    Monetary (total blood donated in c.c.):
                    <input type="number" value={monetary} onChange={(e) => setMonetary(e.target.value)} required />
                </label>
                <label>
                    Time (months since first donation):
                    <input type="number" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>
                <button type="submit">Predict</button>
            </form>
            <div>{result}</div>
        </div>
    );
};

export default PredictionForm;

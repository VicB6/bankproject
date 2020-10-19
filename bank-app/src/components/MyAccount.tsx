import React, { useState, useEffect } from "react";
import {User} from "../services/users";
import { getForexRatesApi } from "../services/getForexRatesApi";
import { parsingForexApiAnswer } from "../services/parsingForexApiAnswer";
import "../App.css";
import {searchForexRate} from "../services/searchForexRate"

import { useForm } from "react-hook-form";

type curencySymbol = {
  name: string;
};

export function MyAccount(){

    //call the API
    const [forexRates, setForexRates] = useState({rates:{"error":0}});
    useEffect(() => {
        getForexRatesApi().then((res) => setForexRates(res));
    },[]);
    console.log(forexRates)
    const parsedForexRates : [string[],unknown[]] = parsingForexApiAnswer(forexRates)

    let currencies = Array.from(parsedForexRates[0])
    currencies = currencies.sort()

    //Currency Form
    const { register, handleSubmit } = useForm<curencySymbol>();
    const [targetCurrency, setTargetCurrency] = useState("AUD");
    const onSubmit = (data:curencySymbol) => setTargetCurrency(data["name"]);

    return (<p>
        <h1>Welcome to your account</h1>
        <h2>Your currencies</h2>
        <div>
            <ul>
                <li>1000 EUR</li>
                <li>500 SGD</li>
            </ul>
        </div>

        <h2>Convert your Euros in another currency</h2>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="name" ref={register}>
                    {currencies.map((currency) => (
                    <option value={currency}>{currency}</option>
                    ))}
                </select>
                <input type="submit" value="Check rate"  />
            </form>
        </div>
        <div>Our rate to exchange EUR to {targetCurrency} is : {searchForexRate(parsedForexRates,targetCurrency)} </div>
        </p>
    )
}

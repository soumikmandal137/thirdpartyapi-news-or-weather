import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { Box, Skeleton, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const WeatherApi = () => {
  const apikey = import.meta.env.VITE_WEATHER_API_KEY;
  const [countries, setCountries] = useState([]);
  const [states, setState] = useState([]);
  const [ctites, setCities] = useState([]);

  const [selectCountry, setSelectcounty] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");

  useEffect(() => {
    const country = Country.getAllCountries();
    setCountries(country);
  }, [countries]);

  useEffect(()=>{
    if(selectCountry){
        const allState = State.getStatesOfCountry(selectCountry);
        setState(allState);  
    }
  },[selectCountry])

  useEffect(()=>{
    if(selectCountry && selectState){
        const allcity = City.getCitiesOfState(selectCountry, selectState)
        // console.log(allcity);   
        setCities(allcity);  
    }
  },[selectCountry, selectState])

  return <>
         <Typography>Weather</Typography>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">County</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectCountry}
            label="Age"
            onChange={(e) => setSelectcounty(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {countries?.map((country) => {
              return (
                <MenuItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectState}
            disabled={!selectCountry}
            label="State"
            onChange={(e) => setSelectState(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {states?.map((state) => {
              return (
                <MenuItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectCity}
            disabled={!selectState}
            label="State"
            onChange={(e) => setSelectCity(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ctites?.map((city) => {
              return (
                <MenuItem key={city.name} value={city.name}>
                  {city.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
  </>;
};

export default WeatherApi;

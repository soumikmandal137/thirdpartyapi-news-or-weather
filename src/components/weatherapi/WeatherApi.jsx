import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { Box, Button, Skeleton, Typography } from "@mui/material";
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


import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';






const WeatherApi = () => {
  const apikey = import.meta.env.VITE_WEATHER_API_KEY;
  const [countries, setCountries] = useState([]);
  const [states, setState] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectCountry, setSelectcounty] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData,setWeatherData] =useState({});

    const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectCity}&appid=${apikey}&units=metric`
      );
      // console.log(response?.data?.articles);
      // console.log(response);
      setWeatherData(response?.data)
      
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

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
        console.log(allcity);   
        setCities(allcity);  
    }
  },[selectCountry, selectState])
useEffect(()=>{
  if(selectCity){
    fetchData();
  }
},[selectCity]);

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
            {cities?.map((city) => {
              return (
                <MenuItem key={city.name} value={city.name}>
                  {city.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button onClick={fetchData}>Fetch Data</Button>
      </Box>
      

 <Box sx={{ m: 2 }}>
        {loading ? (
          <Skeleton variant="rectangular" width={300} height={180} />
        ) :(
          <Box
            sx={{
              p: 2,
              maxWidth: 300,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h6">{weatherData?.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            
              <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                {weatherData?.weather?.[0]?.description}
              </Typography>
            </Box>
            <Typography variant="body1">
              latitude: {weatherData?.latitude}
            </Typography>
            <Typography variant="body1">
               longitude: {weatherData?.longitude}
            </Typography>
           
          </Box>
        )}
      </Box>




  </>;
};

export default WeatherApi;

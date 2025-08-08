import { Box, Skeleton, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Country } from "country-state-city";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NewsApi = () => {
  const apikey = import.meta.env.VITE_NEWS_API_KEY;
  const [news, setNews] = useState([]);
  const country = Country.getAllCountries();
  const [selectcounty, setSelectcounty] = useState("US");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${selectcounty.toLowerCase()}&apiKey=${apikey}`
      );
      console.log(response?.data?.articles);
      setNews(response?.data?.articles);
    } catch (error) {
      // console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectcounty) {
      fetchData();
    }
  }, [selectcounty]);
    // console.log("news", news);
    // console.log("selectcounty", selectcounty);

  return (
    <>
      <Typography>News List</Typography>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">County</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectcounty}
            label="Age"
            onChange={(e) => setSelectcounty(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {country?.map((country) => {
              return (
                <MenuItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </>
      ) : news?.length !== 0 ? (
        <Box>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {news?.map((article, index) => {
              return (
                <>
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={article.urlToImage} />
                    </ListItemAvatar>
                    <ListItemText
                      //   onClick={()=>navigate(`${article.url}`)}
                      primary={article.title}
                      secondary={
                        <React.Fragment>
                          {/* <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                         {article.title}
                        </Typography> */}
                          {article.description}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
          </List>
        </Box>
        ):(
          <Box>
            No News....
          </Box>
        )
      }
    </>
  );
};

export default NewsApi;

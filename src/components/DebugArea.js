// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import {
  CHERRY,
  SEVEN,
  BAR3X,
  BAR2X,
  BAR,
  TOP,
  MIDDLE,
  BOTTOM,
  RANDOM,
  FIXED
} from "../constants";

export const DebugArea = ({
  classes,
  mode,
  parentState,
  handleChange,
  enabled
}) => (
  <Paper className={classes.paper}>
    <Grid container>
      <Grid item xs={12}>
        <h3>Debug Area</h3>
      </Grid>
      <Grid item xs={12}>
        <InputLabel htmlFor="age-simple">Mode</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <Select
          value={mode}
          onChange={handleChange}
          inputProps={{ name: "mode" }}
          disabled={enabled ? false : true}
        >
          <MenuItem value={RANDOM}>{RANDOM}</MenuItem>
          <MenuItem value={FIXED}>{FIXED}</MenuItem>
        </Select>
      </Grid>
      {[1, 2, 3].map(r => (
        <Grid item xs={4} key={r}>
          <h3>Reel {r}</h3>
          <Grid item xs={12} spacing={8} className={classes.gridPadding}>
            <InputLabel htmlFor={`symbolReel${r}`}>Symbol</InputLabel>
          </Grid>
          <Grid item xs={12}>
            <Select
              value={parentState[`symbolReel${r}`]}
              onChange={handleChange}
              inputProps={{ name: `symbolReel${r}` }}
              disabled={enabled ? false : true}
            >
              <MenuItem value={BAR}>{BAR}</MenuItem>
              <MenuItem value={BAR2X}>{BAR2X}</MenuItem>
              <MenuItem value={BAR3X}>{BAR3X}</MenuItem>
              <MenuItem value={SEVEN}>{SEVEN}</MenuItem>
              <MenuItem value={CHERRY}>{CHERRY}</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} className={classes.gridPadding}>
            <InputLabel htmlFor={`landingPositionReel${r}`}>
              Landing Position
            </InputLabel>
          </Grid>
          <Grid item xs={12}>
            <Select
              value={parentState[`landingPositionReel${r}`]}
              onChange={handleChange}
              inputProps={{ name: `landingPositionReel${r}` }}
              disabled={enabled ? false : true}
            >
              <MenuItem value={TOP}>{TOP}</MenuItem>
              <MenuItem value={MIDDLE}>{MIDDLE}</MenuItem>
              <MenuItem value={BOTTOM}>{BOTTOM}</MenuItem>
            </Select>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

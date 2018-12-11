// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {
  CHERRY,
  SEVEN,
  BAR3X,
  BAR2X,
  BAR,
  WINNING_PAY_TABLE_CHERRYS_ON_TOP,
  WINNING_PAY_TABLE_CHERRYS_ON_MIDDLE,
  WINNING_PAY_TABLE_CHERRYS_ON_BOTTOM,
  WINNING_PAY_TABLE_SEVENS_ANY_LINE,
  WINNING_PAY_TABLE_CHERRY_AND_SEVEN,
  WINNING_PAY_TABLE_3XBAR_LINE,
  WINNING_PAY_TABLE_2XBAR_LINE,
  WINNING_PAY_TABLE_BAR_LINE,
  WINNING_PAY_TABLE_COMBINAION_BAR_LINE
} from "../../constants";
import cherryImage from "./Cherry.png";
import sevenImage from "./7.png";
import bar3xImage from "./3XBAR.png";
import bar2xImage from "./2xBAR.png";
import barImage from "./BAR.png";
import "../../containers/SlotMachine.css";

export const PayTable = ({ isWinningPayTableLine }) => <span>
           <h3>Pay-Table</h3>
           <List className="{classes.root}">
             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_CHERRYS_ON_TOP) ? "blink_me" : ""}>
               <ListItemText primary="3 CHERRY symbols on top line 2000" />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
             </ListItem>
             <Divider />

             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_CHERRYS_ON_MIDDLE) ? "blink_me" : ""}>
               <ListItemText primary="3 CHERRY symbols on center line 1000 " />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
             </ListItem>
             <Divider />

             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_CHERRYS_ON_BOTTOM) ? "blink_me" : ""}>
               <ListItemText primary="3 CHERRY symbols on bottom line 4000 " />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
             </ListItem>
             <Divider />

             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_SEVENS_ANY_LINE) ? "blink_me" : ""}>
               <ListItemText primary="3 7 symbols on any line 150" />
               <img src={sevenImage} className="img-pay-table" alt={SEVEN} />
               <img src={sevenImage} className="img-pay-table" alt={SEVEN} />
               <img src={sevenImage} className="img-pay-table" alt={SEVEN} />
             </ListItem>
             <Divider />

             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_CHERRY_AND_SEVEN) ? "blink_me" : ""}>
               <ListItemText primary="Any combination of CHERRY and 7 on any line 75" />
               <img src={cherryImage} className="img-pay-table" alt={CHERRY} />
               <img src={sevenImage} className="img-pay-table" alt={SEVEN} />
             </ListItem>
             <Divider />

             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_3XBAR_LINE) ? "blink_me" : ""}>
               <ListItemText primary="3 3xBAR symbols on any line 50" />
               <img src={bar3xImage} className="img-pay-table" alt={BAR3X} />
               <img src={bar3xImage} className="img-pay-table" alt={BAR3X} />
               <img src={bar3xImage} className="img-pay-table" alt={BAR3X} />
             </ListItem>
             <Divider />

             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_2XBAR_LINE) ? "blink_me" : ""}>
               <ListItemText primary="3 2xBAR symbols on any line 20 " />
               <img src={bar2xImage} className="img-pay-table" alt={BAR2X} />
               <img src={bar2xImage} className="img-pay-table" alt={BAR2X} />
               <img src={bar2xImage} className="img-pay-table" alt={BAR2X} />
             </ListItem>
             <Divider />

             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_BAR_LINE) ? "blink_me" : ""}>
               <ListItemText primary="3 BAR symbols on any line 10 " />
               <img src={barImage} className="img-pay-table" alt={BAR} />
               <img src={barImage} className="img-pay-table" alt={BAR} />
               <img src={barImage} className="img-pay-table" alt={BAR} />
             </ListItem>
             <Divider />

             <ListItem button className={isWinningPayTableLine(WINNING_PAY_TABLE_COMBINAION_BAR_LINE) ? "blink_me" : ""}>
               <ListItemText primary="Combination of any BAR symbols on any line 5" />
               <img src={barImage} className="img-pay-table" alt={BAR} />
               <img src={bar2xImage} className="img-pay-table" alt={BAR} />
               <img src={bar3xImage} className="img-pay-table" alt={BAR} />
             </ListItem>
             <Divider />
           </List>
         </span>;

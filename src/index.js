
import './style.css';
import React from "react";
import { createRoot } from "react-dom/client";
import FindTheQueen from "./Hello";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<FindTheQueen />);

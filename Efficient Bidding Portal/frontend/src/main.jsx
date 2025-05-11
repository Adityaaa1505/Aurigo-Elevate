import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './pages/dashboard.jsx'
import { createBrowserRouter, Router, RouterProvider} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Client from './pages/Client.jsx'
import Opt from './pages/Opt.jsx'
import Vendor from './pages/Vendor.jsx'
import Board from './pages/Board.jsx'
import Bid from './pages/Bid.jsx'
import StopBid from './pages/StopBid.jsx'
import DoneBid from './pages/DoneBid.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Bid />
  </StrictMode>,
)

import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import "./App.css";
import TableFilter from "./Components/TableFilter";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { useState } from "react";
import AddProduct from "./Components/AddProduct";

function App() {
  const [filterPrice, setFilterPrice] = useState(3);
  const [filterStock, setFilterStock] = useState(2);
  const [price, setPrice] = useState(100.0);
  const [stock, setStock] = useState(5);

  return (
    <div>
      <div className="main_title">Product Table</div>

      <div className="inputs">
        {/* For Filtering */}
        <div className="formcontrol">
          <FormControl className="control">
            <InputLabel shrink>Price</InputLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </FormControl>
          <FormControl className="control">
            <InputLabel shrink>filterby</InputLabel>
            <Select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            >
              <MenuItem value={1}>
                <DragHandleIcon />
              </MenuItem>
              <MenuItem value={2}>
                <NavigateNextIcon />
              </MenuItem>
              <MenuItem value={3}>
                <NavigateBeforeIcon />
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="formcontrol">
          <FormControl className="control">
            <InputLabel shrink>Stock</InputLabel>
            <Input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
          </FormControl>
          <FormControl className="control">
            <InputLabel shrink>filterby</InputLabel>

            <Select
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
            >
              <MenuItem value={1}>
                <DragHandleIcon />
              </MenuItem>
              <MenuItem value={2}>
                <NavigateNextIcon />
              </MenuItem>
              <MenuItem value={3}>
                <NavigateBeforeIcon />
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <TableFilter
          price={price}
          filterprice={filterPrice}
          filterstock={filterStock}
          stock={stock}
        />
      </div>
      <div className="addproduct">
        <AddProduct />
      </div>
    </div>
  );
}

export default App;

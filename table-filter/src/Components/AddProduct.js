import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import "./AddProduct.css";
import { createProduct } from "./Helper/apicalls";
import { Alert, AlertTitle } from "@material-ui/lab";

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    menufacturer: "",
    price: "",
    quantity: "",
    stock: "",
    error: "",
    success: false,
  });

  const { name, menufacturer, price, quantity, stock, error, success } =
    product;

  const handleChange = (name) => (event) => {
    setProduct({ ...product, error: false, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setProduct({ ...product, error: false, success: true });
    createProduct(product)
      .then((data) => {
        if (data.error) {
          setProduct({ ...product, error: data.error, success: false });
        } else {
          console.log(product);
          setProduct({
            ...product,
            name: "",
            menufacturer: "",
            price: "",
            quantity: "",
            stock: "",
            error: "",
            success: false,
          });
        }
      })
      .catch((err) => console.log("Product is not adding"));
  };

  const handleErrorMessage = () => {
    return (
      <div>
        <Alert severity="error" style={{ display: error ? "" : "none" }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </div>
    );
  };

  const handleSuccessMessage = () => {
    return (
      <div>
        <Alert severity="success" style={{ display: success ? "" : "none" }}>
          <AlertTitle>Success</AlertTitle>
          Product Added SuccessFully
        </Alert>
      </div>
    );
  };

  return (
    <div className="addproduct_main">
      <div className="btn_container">
        <Button color="primary" size="large" onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </div>
      <div className="modal_container">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="modal_main"
        >
          <Paper className="modal_body">
            <div className="modal_title">Add Product</div>
            {handleSuccessMessage()}
            {handleErrorMessage()}
            <FormControl>
              <InputLabel>Product Name</InputLabel>
              <Input
                type="text"
                fullWidth
                value={name}
                onChange={handleChange("name")}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Product Menufacturer</InputLabel>
              <Input
                type="text"
                fullWidth
                value={menufacturer}
                onChange={handleChange("menufacturer")}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Product Price</InputLabel>
              <Input
                type="number"
                fullWidth
                value={price}
                onChange={handleChange("price")}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Product quantity</InputLabel>
              <Input
                type="number"
                fullWidth
                value={quantity}
                onChange={handleChange("quantity")}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Product stock</InputLabel>
              <Input
                type="number"
                fullWidth
                value={stock}
                onChange={handleChange("stock")}
              />
            </FormControl>
            <Button
              variant="contained"
              color="secondary"
              className="btn_secondary"
              onClick={onSubmit}
            >
              Add Product
            </Button>
          </Paper>
        </Modal>
      </div>
    </div>
  );
};

export default AddProduct;

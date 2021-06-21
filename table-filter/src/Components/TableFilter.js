import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import "./TableFilter.css";
import { getAllProduct } from "./Helper/apicalls";

const TableFilter = ({ price, filterprice, filterstock, stock }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const preload = () => {
    getAllProduct().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRowCount(data.length);
        setProducts(data);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    preload();
  }, [products]);

  return (
    <div className="container">
      <TableContainer className="tablecontainer" component={Paper}>
        <Table aria-label="simple table" className="table">
          <TableHead>
            <TableRow>
              <TableCell className="tablehead">Product Name</TableCell>
              <TableCell className="tablehead">Menufacturer</TableCell>
              <TableCell className="tablehead">Price</TableCell>
              <TableCell className="tablehead">Quantity</TableCell>
              <TableCell className="tablehead">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .filter((product) => {
                if (price == "" || stock == "") {
                  return product;
                }
                if (filterprice == "1") {
                  if (filterstock == "1") {
                    return (
                      product.product_price == price &&
                      product.product_stock == stock
                    );
                  } else if (filterstock == "2") {
                    return (
                      product.product_price == price &&
                      product.product_stock > stock
                    );
                  } else {
                    return (
                      product.product_price == price &&
                      product.product_stock < stock
                    );
                  }
                } else if (filterprice == "2") {
                  if (filterstock == "1") {
                    return (
                      product.product_price > price &&
                      product.product_stock == stock
                    );
                  } else if (filterstock == "2") {
                    return (
                      product.product_price > price &&
                      product.product_stock > stock
                    );
                  } else {
                    return (
                      product.product_price > price &&
                      product.product_stock < stock
                    );
                  }
                } else {
                  if (filterstock == "1") {
                    return (
                      product.product_price < price &&
                      product.product_stock == stock
                    );
                  } else if (filterstock == "2") {
                    return (
                      product.product_price < price &&
                      product.product_stock > stock
                    );
                  } else {
                    return (
                      product.product_price < price &&
                      product.product_stock < stock
                    );
                  }
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, id) => (
                <TableRow key={id}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.product_menu}</TableCell>
                  <TableCell>{product.product_price}</TableCell>
                  <TableCell>{product.product_quantity}</TableCell>
                  <TableCell>{product.product_stock}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={rowCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableFilter;

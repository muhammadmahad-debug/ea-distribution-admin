import { Table, TableHeader, TableCell, TableContainer,  Card, CardBody, Pagination, TableRow, TableBody } from "@windmill/react-ui";
import PageTitle from 'components/Typography/PageTitle';
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DiscountServices from 'services/DiscountServices';
const DiscountDetails = () => {
  const ID = useSelector((state) => state.viewId);
  const itemsPerPage = 2; // You can change this number to adjust the items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [discountdata, setDiscount] = useState({ customers: [], products: [] });
    const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await DiscountServices.getDiscountById(ID);
        setDiscount(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [ID]);
  // Calculate the index range for the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = discountdata.customers.slice(firstIndex, lastIndex);
  // Calculate the total number of pages
  const totalPages = Math.ceil(discountdata.customers.length / itemsPerPage);
  // Function to handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <PageTitle>Discount Details</PageTitle>
      {loading ? (
         <TableLoading row={12} col={7} width={160} height={20} />
       ) : discountdata?.length !== 0 && (
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>DISCOUNT</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                {discountdata.products.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item?.title.en}</TableCell>
                    <TableCell>
                      <img width={50} src={item.image} alt={item?.title.en} />
                    </TableCell>
                  </TableRow>
                ))}
                <TableCell>{discountdata?.discountPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       )}
      {/* Pagination controls */}
      <Card>
        <CardBody>
          <Pagination
            totalResults={discountdata.customers.length}
            resultsPerPage={itemsPerPage}
            label="Discount navigation"
            onChange={onPageChange}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>

      {!loading && discountdata.length=== 0 && ( 
        <NotFound title="Discount Details page not found" />
      )}
    </div>
  );
};
export default DiscountDetails;













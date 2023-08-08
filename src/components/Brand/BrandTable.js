import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
//internal import
import useToggleDrawer from "hooks/useToggleDrawer";
import AttributeDrawer from "components/drawer/AttributeDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import EditDeleteButton from "components/table/EditDeleteButton";
import DeleteModal from "components/modal/DeleteModal";
import { showingTranslateValue } from "utils/translate";
import BrandDrawer from "components/drawer/BrandDrawer";

const BrandTable = ({ lang, isCheck, setIsCheck, attributes,data }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

   console.log('attributes', data);

  return (
    <>
      {/* {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />} */}

      {/* {isCheck.length < 2 && ( */}
        <MainDrawer>
          <BrandDrawer id={serviceId} />
        </MainDrawer>
      {/* // )} */}

      <TableBody>
        {Array.isArray(data) &&data?.map((brand) => (
          <TableRow key={brand._id}>
            <TableCell>
              {/* <CheckBox
                type="checkbox"
                name="attribute"
                id={brand._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(brand._id)}
              /> */}
            </TableCell>


            <TableCell className="font-medium text-sm">
             {brand.name}
            </TableCell>

            <TableCell className="font-medium text-sm">

              <img
                 src={brand.logo}
                 width={40}
              />
            </TableCell>

            <TableCell className="font-medium text-sm">
              {brand.name}
            </TableCell>

            <TableCell className="font-medium text-sm"> 
              <img  width={40} src={brand.metaImage}/>
              
            </TableCell>

            <TableCell className="font-medium text-sm">
              {brand.metaDescription}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {brand.slug}
            </TableCell>

            <TableCell className="flex justify-center">
              <Link
                to={`/brand/${brand._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
              >
                {/* <Tooltip
                  id="edit values"
                  Icon={FiEdit}
                  title="Edit Values"
                  bgColor="#10B981"
                /> */}
              </Link>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={brand._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(brand.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default BrandTable;

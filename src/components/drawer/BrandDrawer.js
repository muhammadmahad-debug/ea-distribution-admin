

import { useState, useContext, useEffect } from "react";
import { SidebarContext } from "context/SidebarContext";
import LabelArea from "components/form/LabelArea";
import Multiselect from "multiselect-react-dropdown";
import CustomerServices from "services/CustomerServices";
import ProductServices from "services/ProductServices";
import DiscountServices from "services/DiscountServices";
import { notifyError, notifySuccess } from "utils/toast";
import Title from "components/form/Title";
import { Scrollbars } from "react-custom-scrollbars-2";
import DrawerButton from "components/form/DrawerButton";
import { t } from "i18next";
import useAsync from "hooks/useAsync";
import { Card, CardBody, Input } from "@windmill/react-ui";
import InputArea from "components/form/InputArea";
import Uploader from "components/image-uploader/Uploader";
import useBrandSubmit from "hooks/useBrandSubmit";
import Error from "components/form/Error";
const BrandDrawer = ({ id, add, handleAdd, handleUpd, update }) => {
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    searchCustomerName,
    sortedField,
    limitData,
    setSearchText,
    setSortedField,
    setSearchCustomerName,
  } = useContext(SidebarContext);


  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    variants,
    addVariant,
    isSubmitting,
    setIsSubmitting,
    removeVariant,
    handleSelectLanguage,
    imageUrl,
    setImageUrl,
    metaImage,
    setMetaImage,
    setValue
  } = useBrandSubmit(id);

  console.log(metaImage, ":::::::::")


  useEffect(() => {
    setValue("logo", imageUrl)
    setValue("metaImage", metaImage)
  }, [imageUrl, metaImage])


  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={() => { }}
            title={t("Update Brand")}
          //  description={t("UpdateDiscount")}
          />
        ) : (
          <Title
            register={() => { }}
            title={t("Add Brand")}
          // description={t("AddDiscount")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Brand Name")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    name="name"
                    label="name"
                    placeholder="Brand Name"
                  />
                  {/* <Error errorName={errors.name} /> */}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Logo")} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    folder="Brand"
                  />



                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Meta Title")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    name="metaTitle"
                    label="metaTitle"
                    placeholder="Meta Title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("MetaDescription")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    name="metaDescription"
                    label="metaDescription"
                    placeholder="Meta Description"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Meta Image")} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    imageUrl={metaImage}
                    setImageUrl={setMetaImage}

                  />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Slug")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    name="slug"
                    label="slug"
                    placeholder="slug"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <div className="col-span-8 sm:col-span-4">
                  <DrawerButton
                    id={id}
                    title="Brand"
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};
export default BrandDrawer;
